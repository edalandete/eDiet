// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  signupUrl: 'http://localhost:2516/signup',
  loginUrl: 'http://localhost:2516/login',
  dieticiansUrl: 'http://localhost:2516/api/dieticians/',
  dietsUrl: 'http://localhost:2516/api/diets/',
  appointmentsUrl: 'http://localhost:2516/api/appointments/',
  patientsUrl: 'http://localhost:2516/api/patients/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
