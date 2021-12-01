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
    let newYears = new Date("2022-01-01T00:00:00");
    let today = new Date();

    if (today >= newYears) {
      this.showSplash = false;
    } else {
      this.showSplash = true;

      let randInt = this.getRandomFromRange(1, 5);

      let selectedImage: string;

      if (randInt === 1) {
        selectedImage = "charlie-tree-xmas";
      } else if (randInt === 2) {
        selectedImage = "hanukkah-party";
      } else if (randInt === 3) {
        selectedImage = "kwanzaa-candle";
      } else if (randInt === 4) {
        selectedImage = "linus-tree-xmas";
      } else {
        selectedImage = "peanuts-happy-new-year";
      }

      this.selectedImagePath = `/assets/images/${selectedImage}.gif`;
    }

    setTimeout(() => {
      this.showSplash = false;
    }, 6800);
  }

  getRandomFromRange(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
