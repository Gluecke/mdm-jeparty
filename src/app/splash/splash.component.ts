import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.css']
})
export class SplashComponent implements OnInit {
  showSplash?: Boolean;

  constructor() { }

  ngOnInit(): void {
    let endOfHalloween = new Date("2021-12-01T00:00:00");
    let today = new Date();

    if (today >= endOfHalloween) {
      this.showSplash = false;
    } else {
      this.showSplash = true;
    }

    setTimeout(() => {
      this.showSplash = false;
    }, 6800);
  }
}
