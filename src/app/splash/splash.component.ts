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
    let expire = new Date("2022-05-01T00:00:00");
    let today = new Date();

    if (today >= expire) {
      this.showSplash = false;
    } else {
      this.showSplash = true;

      let openingDay = new Date("2022-04-07T00:00:00");
      let closingDay = new Date("2022-04-08T00:00:00");
      if (today >= openingDay && today < closingDay) {
        this.selectedImagePath = `/assets/images/naked-gun.gif`;
      } else {
        this.selectedImagePath = `/assets/images/mime-wall.gif`;
      }
    }

    setTimeout(() => {
      this.showSplash = false;
    }, 7000);
  }

  getRandomFromRange(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
