import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DocumentSnapshot, Firestore, collection, deleteDoc, doc, docData, getDoc, getDocs, onSnapshot, setDoc, updateDoc } from '@angular/fire/firestore';
import { interval, Subscription, takeWhile } from 'rxjs';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-timer',
  imports: [FormsModule, MatInputModule, MatIconModule, MatButtonModule],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.css'
})
export class TimerComponent implements OnInit, OnDestroy {
  store = inject(Firestore);
  startValue: number = 60;
  countdownValue: number | undefined;
  firestoreValue: number | undefined;
  private countdownSubscription: Subscription | undefined;
  private firestoreUnsubscribe: (() => void) | undefined;
  private countdownDoc: any;

  ngOnInit(): void {
    this.countdownDoc = doc(this.store, 'countdown', 'countdown');

    this.firestoreUnsubscribe = onSnapshot(this.countdownDoc, (docSnapshot: DocumentSnapshot) => {
      if (docSnapshot.exists()) {
        this.firestoreValue = docSnapshot.data()['value'];
      } else {
        this.firestoreValue = undefined;
      }
    });
  }

  startCountdown(): void {
    if (!this.startValue || this.startValue < 0) {
      alert("Please enter a valid positive number.");
      return;
    }

    this.countdownValue = this.startValue;

    if (this.countdownSubscription) {
      this.countdownSubscription.unsubscribe();
    }

    this.countdownSubscription = interval(1000)
      .pipe(takeWhile(val => this.countdownValue! >= 0))
      .subscribe(() => {
        if (this.countdownValue! > 0) {
          this.countdownValue!--;
          this.updateFirestoreValue(this.countdownValue!);
        } else {
          this.countdownValue = 0;
          this.updateFirestoreValue(0);
          if (this.countdownSubscription) {
            this.countdownSubscription.unsubscribe();
          }
        }
      });
  }

  private updateFirestoreValue(value: number): void {
    setDoc(this.countdownDoc, { value: value }, { merge: true })
      .then(() => {
        console.log('Value successfully written to Firestore!');
      })
      .catch(error => {
        console.error('Error writing value to Firestore:', error);
      });
  }

  ngOnDestroy(): void {
    if (this.countdownSubscription) {
      this.countdownSubscription.unsubscribe();
    }

    if (this.firestoreUnsubscribe) {
      this.firestoreUnsubscribe();
    }
  }
}
