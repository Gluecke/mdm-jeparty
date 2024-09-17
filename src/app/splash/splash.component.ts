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
    let expire = new Date("2024-10-15T00:00:00");
    let today = new Date();
    this.showGif = true;
    this.showVideo = false;

    if (today >= expire) {
      this.showSplash = false;
    } else {
      this.showSplash = true;

      let startShowingSplash = new Date("2022-08-01T00:00:00");
      if (today >= startShowingSplash) {

        // let paths: string[] = Array.from(Array(12)).map((x, i) => {
        // return "t-" + i + ".gif";
        // });

        let paths: string[] = ['leafzoom2.webp', 'leafzoom3.webp', 'leafzoom4.webp', 'leafzoom1.mp4'];
        let selectedIndex = this.getRandomFromRange(0, paths.length - 1);
        if (paths[selectedIndex].includes("gif") || paths[selectedIndex].includes("webp") || paths[selectedIndex].includes("jpg") || paths[selectedIndex].includes("jpeg")) {
          this.selectedImagePath = `/assets/images/${paths[selectedIndex]}`;
          this.showGif = true;
          this.showVideo = false;
        } else {
          this.selectedVideoPath = `/assets/video/${paths[selectedIndex]}`;
          this.showVideo = true;
          this.showGif = false;
        }
      }
    }

    setTimeout(() => {
      this.showSplash = false;
    }, 11000);
  }

  getRandomFromRange(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

}
