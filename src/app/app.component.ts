import { Guess } from './guess/guess';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { getAuth, signInAnonymously } from "firebase/auth";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  showAnswers: Observable<ShowAnswers> = this.store.doc('showAnswers/1').valueChanges({ idField: 'id' }) as unknown as Observable<ShowAnswers>;
  title = 'jeparty';
  guesses: Observable<Guess[]> = this.store.collection('guesses').valueChanges({ idField: 'id' }) as Observable<Guess[]>;

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

    this.store.doc<ShowAnswers>('showAnswers/1').get()
      .toPromise()
      .then(sn => {
        if (!sn.exists) {
          this.store.collection('showAnswers').doc("1").set({ show: false });
        }
      });

  }

  newQuestion(): void {
    this.store.collection<Guess>('guesses').get()
      .toPromise()
      .then(snapshot => {
        snapshot.docs.forEach(g => {
          g.ref.delete();
        })
      });
  }

  revealAnswers(): void {

    this.store.doc<ShowAnswers>('showAnswers/1').get()
      .toPromise()
      .then(sn => {
        let toShow = !sn.data()?.show;
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
}

export interface ShowAnswers {
  id?: string;
  show: boolean;
}
