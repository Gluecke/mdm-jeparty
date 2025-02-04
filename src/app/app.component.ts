import { MatButtonModule } from '@angular/material/button';
import { Firestore, collection, deleteDoc, doc, docData, getDoc, getDocs, setDoc, updateDoc } from '@angular/fire/firestore';
import { Guess } from './guess/guess';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { getAuth, signInAnonymously } from "firebase/auth";
import { saveAs } from 'file-saver-es';
import { CommonModule } from '@angular/common';
import { SplashComponent } from "./splash/splash.component";
import { HeaderComponent } from "./header/header.component";
import { ContestantComponent } from "./contestant/contestant.component";
import { GuessComponent } from "./guess/guess.component";
import { FooterComponent } from "./footer/footer.component";
import {  MatIconModule } from '@angular/material/icon';
import { collectionData } from 'rxfire/firestore';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [CommonModule,
    SplashComponent,
    HeaderComponent,
    ContestantComponent,
    GuessComponent,
    FooterComponent,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatInputModule]
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'jeparty';
  guesses: Guess[] = [];
  ngUnsubscribe = new Subject();
  guessVisibility: Observable<GuessVisibility> | undefined;
  store = inject(Firestore);

  ngOnInit(): void {
    const auth = getAuth();
    signInAnonymously(auth)
      .then(() => {
        console.log("anonymous sign in successful");
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(`anonymous sign in error ${errorCode} - ${errorMessage}`, error);
      });

    const guessesCollection = collection(this.store, 'guesses');

    const guesses$: Observable<Guess[]> = collectionData(guessesCollection, { idField: 'id' })
      .pipe(
        takeUntil(this.ngUnsubscribe),
        map(documents => documents.map(doc => ({ ...doc } as unknown as Guess)))
      );

    guesses$.subscribe(guesses => {
      this.guesses = guesses.sort((a, b) => a.dateSubmitted.toDate().getTime() - b.dateSubmitted.toDate().getTime());
    });

    const guessVisDocRef = doc(this.store, 'guessVisibility/1');

    this.guessVisibility = docData(guessVisDocRef, { idField: 'id' }) as Observable<GuessVisibility>;

    getDoc(guessVisDocRef).then(snapshot => {
      if (snapshot.exists()) {
        const guessVisibilityData = snapshot.data() as GuessVisibility;
        console.log("Existing Guess Visibility:", guessVisibilityData);
      } else {
        const initialGuessVisibility: GuessVisibility = { show: false };
        setDoc(guessVisDocRef, initialGuessVisibility).then(() => {
          console.log("Guess Visibility document created.");
        }).catch(error => {
          console.error("Error creating document:", error);
        });
      }
    }).catch(error => {
      console.error("Error getting document:", error);
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
    console.log("destroyed");
  }

  newQuestion(): void {
    const guessesCollection = collection(this.store, 'guesses');

    getDocs(guessesCollection).then(snapshot => {
      if (!snapshot.empty) {
        const deletePromises = snapshot.docs.map(g => {
          const guessDocRef = doc(this.store, `guesses/${g.id}`);
          return deleteDoc(guessDocRef);
        });

        Promise.all(deletePromises).then(() => {
          this.toggleGuessVisibility(false);
          console.log("All guesses deleted.");
        }).catch(error => {
          console.error("Error deleting guesses:", error);
        });
      } else {
        this.toggleGuessVisibility(false);
        console.log("No guesses to delete.");
      }
    }).catch(error => {
      console.error("Error getting guesses:", error);
    });
  }

  toggleGuessVisibility(show?: boolean): void {
    const guessVisibilityDocRef = doc(this.store, 'guessVisibility/1');

    getDoc(guessVisibilityDocRef).then(snapshot => {
      if (snapshot.exists()) {
        let toShow = show ?? !snapshot.data()?.show;

        updateDoc(guessVisibilityDocRef, { show: toShow }).then(() => {
          const guessesCollection = collection(this.store, 'guesses');

          getDocs(guessesCollection).then(guessesSnapshot => {
            if (!guessesSnapshot.empty) {
              const updatePromises = guessesSnapshot.docs.map(g => {
                const guessDocRef = doc(this.store, `guesses/${g.id}`);
                const updates: Partial<Guess> = { showAnswer: toShow };
                return updateDoc(guessDocRef, updates);
              });

              Promise.all(updatePromises).then(() => {
                console.log("Guess visibility and guesses updated.");
              }).catch(error => {
                console.error("Error updating guesses:", error);
              });
            }
          }).catch(error => {
            console.error("Error getting guesses:", error);
          });
        }).catch(error => {
          console.error("Error updating guess visibility:", error);
        });
      }
    }).catch(error => {
      console.error("Error getting guess visibility document:", error);
    });
  }

  downloadAnswers(): void {
    let data: string = this.guesses.map(g => g.contestant.name + ',' + (g.showAnswer ? g.contestant.guess : "********"))
      .join('\r\n');

    let dataBlob: Blob = new Blob([data], { type: 'text/csv' });
    saveAs(dataBlob, 'answers.csv');
  }
}

export interface GuessVisibility {
  id?: string;
  show: boolean;
}
