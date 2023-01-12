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
    let expire = new Date("2023-02-01T00:00:00");
    let today = new Date();
    this.showGif = true;
    this.showVideo = false;

    if (today >= expire) {
      this.showSplash = false;
    } else {
      this.showSplash = true;

      let startShowingSplash = new Date("2022-08-01T00:00:00");
      if (today >= startShowingSplash) {
        let paths: string[] = ['frost-hope.gif'];
        let selectedIndex = this.getRandomFromRange(0, 0);
        this.selectedImagePath = `/assets/images/${paths[selectedIndex]}`;

        // this.selectedVideoPath = `/assets/video/ShortHit.mp4`;
      }
    }

    setTimeout(() => {
      this.showSplash = false;
    }, 8000);
  }

  getRandomFromRange(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

}
