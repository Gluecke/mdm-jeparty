import { Component } from '@angular/core';
import { Contestant } from './contestant/contestant';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'jeparty';

  contestants: Contestant[] = [
    {
      name: "Garrett",
      guess: "what is hello"
    }
  ];

  newQuestion(): void {
    this.contestants = [];
  }

  lockedIn( contestant: Contestant): void {
    console.log(contestant);

    this.contestants.push(contestant);
  }
}
