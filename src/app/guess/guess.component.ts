import { Component, Input } from '@angular/core';
import { Guess } from './guess';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-guess',
  templateUrl: './guess.component.html',
  styleUrls: ['./guess.component.css'],
  imports: [CommonModule, MatCardModule]
})
export class GuessComponent {
  @Input() guess: Guess | null = null;
}
