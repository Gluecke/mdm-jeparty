import { LocalStorageService } from './../services/local-storage.service';
import { Guess } from './../guess/guess';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Contestant } from './contestant';
import { Timestamp } from 'firebase/firestore';

@Component({
  selector: 'app-contestant',
  templateUrl: './contestant.component.html',
  styleUrls: ['./contestant.component.css']
})
export class ContestantComponent implements OnInit {
  contestant: Contestant = { name: "", guess: "" };

  constructor(private store: AngularFirestore, private lss: LocalStorageService) { }

  ngOnInit(): void {
    this.contestant.name = (JSON.parse(this.lss.getData()) as Contestant)?.name;
  }

  submit(): void {
    this.store.collection<Guess>('guesses').add({ contestant: this.contestant, showAnswer: false, dateSubmitted: Timestamp.fromDate(new Date()) });

    this.lss.setData(this.contestant);
  }
}
