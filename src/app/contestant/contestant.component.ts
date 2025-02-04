import { LocalStorageService } from './../services/local-storage.service';
import { Guess } from './../guess/guess';
import { Component, inject, OnInit } from '@angular/core';
import { Firestore, collection, deleteDoc, doc, docData, getDoc, getDocs, setDoc, updateDoc } from '@angular/fire/firestore';
import { Contestant } from './contestant';
import { Timestamp } from 'firebase/firestore';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-contestant',
  templateUrl: './contestant.component.html',
  styleUrls: ['./contestant.component.css'],
  imports: [CommonModule, MatIconModule, MatTooltipModule, FormsModule, MatInputModule, MatButtonModule]
})
export class ContestantComponent implements OnInit {
  private store = inject(Firestore);
  contestant: Contestant = { name: "", guess: "" };

  constructor(private lss: LocalStorageService) { }

  ngOnInit(): void {
    this.contestant.name = (JSON.parse(this.lss.getData()) as Contestant)?.name;
  }

  submit(): void {
    const guessDocRef = doc(this.store, 'guesses', this.contestant.name); // Use doc()

    const guessData: Guess = { // Type the guess data
      contestant: this.contestant,
      showAnswer: false,
      dateSubmitted: Timestamp.fromDate(new Date())
    };

    setDoc(guessDocRef, guessData).then(() => { // Use setDoc()
      this.lss.setData(this.contestant);
      console.log("Guess submitted successfully.");
    }).catch(error => {
      console.error("Error submitting guess:", error);
    });
  }
  // submit(): void {
  //   this.store.collection<Guess>('guesses').doc(this.contestant.name).set({
  //     contestant: this.contestant,
  //     showAnswer: false,
  //     dateSubmitted: Timestamp.fromDate(new Date())
  //   });

  //   this.lss.setData(this.contestant);
  // }
}
