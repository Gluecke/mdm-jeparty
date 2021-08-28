import { Contestant } from './../contestant/contestant';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-guess',
  templateUrl: './guess.component.html',
  styleUrls: ['./guess.component.css']
})
export class GuessComponent {

  @Input() contestant: Contestant | null = null;
  @Input() showAnswers: boolean = false;

}
