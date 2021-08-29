import { Component, Input } from '@angular/core';
import { Guess } from './guess';

@Component({
  selector: 'app-guess',
  templateUrl: './guess.component.html',
  styleUrls: ['./guess.component.css']
})
export class GuessComponent {
  @Input() guess: Guess | null = null;
}
