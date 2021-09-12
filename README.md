# Jeparty

Jeopardy question/answer app.  
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.0.0. 

## Setup

Install [node.js and npm](https://nodejs.org/en/)  
Run `npm install -g @angular/cli` to install angular [CLI](https://angular.io/cli)  
Run `npm install -g firebase-tools` to install firebase-tools [CLI](https://firebase.google.com/docs/cli#setup_update_cli)  
Run `npm install` to install dependencies.

## Development server
### Running local firebase emulators

Run `firebase emulators:start`. This will start emulators as defined in firebase.json files. Edit environment.ts `useEmulator` field to desired value. Navigate to `http://localhost:4000/` to see emulator UI.

### Starting App

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.  
Debugging with vscode is configured in the `.vscode/launch.json` file. Launch app from vscode to add breakpoints.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice.

## Deploy
### CD pipeline

Depoyment via [Github actions](https://github.com/Gluecke/mdm-jeparty/actions). Only [published releases](https://github.com/Gluecke/mdm-jeparty/releases) trigger deployment

### Manual deployment

Run `ng deploy` to deploy the app to firebase

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
