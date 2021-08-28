import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Contestant } from './contestant';

@Component({
  selector: 'app-contestant',
  templateUrl: './contestant.component.html',
  styleUrls: ['./contestant.component.css']
})
export class ContestantComponent {
  @Output() lockedInEvent = new EventEmitter<Contestant>();

  contestant: Contestant = { name: "", guess: ""};
  hasLockedIn: boolean = false;

  lockIn(): void {
    this.hasLockedIn = true;
    this.lockedInEvent.emit(this.contestant);
  }

}
