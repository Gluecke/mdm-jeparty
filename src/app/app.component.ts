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
  showAnswers: boolean = false;
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
    this.store.collection<Guess>('guesses').get()
      .toPromise()
      .then(snapshot => {
        snapshot.docs.forEach(g => {
          const guess = g.data();
          guess.showAnswer = !guess.showAnswer;

          g.ref.update(guess);
        })
      });

    this.showAnswers = !this.showAnswers;
  }




}
