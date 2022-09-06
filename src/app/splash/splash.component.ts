import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.css']
})
export class SplashComponent implements OnInit {
  showSplash?: Boolean;
  showGif?: Boolean;
  showVideo?: Boolean;
  selectedImagePath?: string;
  selectedVideoPath?: string;


  constructor() { }

  ngOnInit(): void {
    let expire = new Date("2022-10-01T00:00:00");
    let today = new Date();
    this.showGif = true;
    this.showVideo = false;

    if (today >= expire) {
      this.showSplash = false;
    } else {
      this.showSplash = true;

      let startShowingSplash = new Date("2022-08-01T00:00:00");
      if (today >= startShowingSplash) {
        this.selectedImagePath = `/assets/images/sept-22.gif`;
        this.selectedVideoPath = `/assets/video/ShortHit.mp4`;
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
