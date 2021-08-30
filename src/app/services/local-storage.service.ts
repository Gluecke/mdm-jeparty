import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setData(data: any): void {
    localStorage.setItem("mdm-jeparty", JSON.stringify(data));
  }

  getData(): any | undefined {
    return localStorage.getItem("mdm-jeparty");
  }
}
