import { Guess } from './guess/guess';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { getAuth, signInAnonymously } from "firebase/auth";
import { saveAs } from 'file-saver';
import { isEqual } from "lodash";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'jeparty';
  guesses: Guess[] = [];
  ngUnsubscribe = new Subject();
  guessVisibility: Observable<GuessVisibility> = (this.store.doc('guessVisibility/1')
    .valueChanges({ idField: 'id' }) as unknown as Observable<GuessVisibility>);

  constructor(private store: AngularFirestore) { }

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

    (this.store.collection('guesses').valueChanges({ idField: 'id' }) as Observable<Guess[]>)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(l => {
        let toRemove: (string | undefined)[] = [];

        this.guesses.map(g => {
          if (!l.find(lg => lg.id === g.id)) {
            toRemove.push(g.id);
          }
        });

        toRemove.forEach(r => {
          let idx = this.guesses.findIndex(g => r === g.id);
          this.guesses.splice(idx, 1);
        });

        l.forEach(lg => {
          let existingGuess = this.guesses.find(fg => fg.id === lg.id);
          if (!existingGuess) {
            this.guesses.push(lg);
          } else if (!isEqual(existingGuess, lg)) {
            let existingIndex = this.guesses.findIndex(eg => eg.id === lg.id)
            this.guesses[existingIndex] = lg;
          }
        });
      });

    this.store.doc<GuessVisibility>('guessVisibility/1').get()
      .toPromise()
      .then(sn => {
        if (!sn.exists) {
          this.store.collection('guessVisibility').doc("1").set({ show: false });
        }
      });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
    console.log("destroyed");
  }

  newQuestion(): void {
    this.store.collection<Guess>('guesses').get()
      .toPromise()
      .then(snapshot => {
        snapshot.docs.forEach(g => {
          g.ref.delete();
        });
        this.toggleGuessVisibility(false);
      });
  }

  toggleGuessVisibility(show?: boolean): void {
    this.store.doc<GuessVisibility>('guessVisibility/1').get()
      .toPromise()
      .then(sn => {
        let toShow = show ?? !sn.data()?.show;
        sn.ref.update({ show: toShow });

        this.store.collection<Guess>('guesses').get()
          .toPromise()
          .then(snapshot => {
            snapshot.docs.forEach(g => {
              const guess = g.data();
              guess.showAnswer = toShow;

              g.ref.update(guess);
            })
          });
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
