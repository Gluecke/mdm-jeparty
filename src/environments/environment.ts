// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  useEmulator: false, //toggle to use local firebase emulator
  production: false,
  firebase: {
    apiKey: "AIzaSyBUr4_SVdSKzeX90Amty85SjpD75Yf0MU8",
    authDomain: "mdm-jeparty.firebaseapp.com",
    projectId: "mdm-jeparty",
    storageBucket: "mdm-jeparty.appspot.com",
    messagingSenderId: "759258707526",
    appId: "1:759258707526:web:c933fa71b3173f70477c47",
    measurementId: "G-N6ZRKJZPK3"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
