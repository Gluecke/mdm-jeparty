import { Component } from '@angular/core';
import { Contestant } from './contestant/contestant';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'jeparty';
  showAnswers: boolean = false;

  contestants: Observable<Contestant[]> =
    this.store.collection('contestants').valueChanges({ idField: 'id' }) as Observable<Contestant[]>;

  constructor(private store: AngularFirestore) { }

  newQuestion(): void {
    this.store.collection('contestants').get().toPromise().then(snapshot => {
      snapshot.docs.forEach(c => {
        c.ref.delete();
      })
    });

    this.showAnswers = false;
  }

  revealAnswers(): void {
    this.showAnswers = !this.showAnswers;
  }

  lockedIn(contestant: Contestant): void {
    console.log(contestant);

    this.store.collection('contestants').add(contestant);
  }
}
