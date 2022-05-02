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
    let expire = new Date("2022-06-01T00:00:00");
    let today = new Date();

    if (today >= expire) {
      this.showSplash = false;
    } else {
      this.showSplash = true;

      let startOfMay = new Date("2022-05-01T00:00:00");
      let mayFifth = new Date("2022-05-05T00:00:00");
      let maySixth = new Date("2022-05-06T00:00:00");
      let maySeventh = new Date("2022-05-07T00:00:00");
      if (today >= startOfMay && today < mayFifth) {
        this.selectedImagePath = `/assets/images/trebek-dance.gif`;
      } else if(today >= mayFifth && today < maySixth) {
        this.selectedImagePath = `/assets/images/trebek-dance.gif`;
      } else if(today >= maySixth && today < maySeventh) {
        this.selectedImagePath = `/assets/images/trebek-dance.gif`;
      } else {
        this.selectedImagePath = `/assets/images/trebek-dance.gif`;
      }
    }

    setTimeout(() => {
      this.showSplash = false;
    }, 5000);
  }

  getRandomFromRange(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
