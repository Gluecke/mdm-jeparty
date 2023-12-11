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
    let expire = new Date("2024-01-05T00:00:00");
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

        let paths: string[] = ['elf-ele.gif', 'elf-nucr.gif', 'elf-smile.gif', 'ho-ho-ho.gif', 'merry-trash.gif', 'santa-arrive.gif', 'vaca-falling.gif', 'xmas-fats.gif', 'yippy-xmas.gif'];
        let selectedIndex = this.getRandomFromRange(0, paths.length - 1);
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
