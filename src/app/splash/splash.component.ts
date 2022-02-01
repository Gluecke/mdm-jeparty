import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.css']
})
export class SplashComponent implements OnInit {
  showSplash?: Boolean;
  selectedImagePath?: string;

  constructor() { }

  ngOnInit(): void {
    let expire = new Date("2022-03-01T00:00:00");
    let today = new Date();

    if (today >= expire) {
      this.showSplash = false;
    } else {
      this.showSplash = true;

      this.selectedImagePath = `/assets/images/ned-gh-day.gif`;
    }

    setTimeout(() => {
      this.showSplash = false;
    }, 4400);
  }

  getRandomFromRange(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}