import { Guess } from './../guess/guess';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Contestant } from './contestant';

@Component({
  selector: 'app-contestant',
  templateUrl: './contestant.component.html',
  styleUrls: ['./contestant.component.css']
})
export class ContestantComponent implements OnInit {
  contestant: Contestant = { name: "", guess: "" };

  constructor(private store: AngularFirestore) { }

  ngOnInit(): void { }

  submit(): void {
    this.store.collection<Guess>('guesses').add({ contestant: this.contestant, showAnswer: false });
  }
}
