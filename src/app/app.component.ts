import { Guess } from './guess/guess';
import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showAnswers: boolean = false;
  title = 'jeparty';
  guesses: Observable<Guess[]> = this.store.collection('guesses').valueChanges({ idField: 'id' }) as Observable<Guess[]>;

  constructor(private store: AngularFirestore) { }

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
