import { NgModule } from '@angular/core';
import { PatientSignup } from './patient-signup';

@NgModule({
  declarations: [
    PatientSignup,
  ],
 
  exports: [
    PatientSignup
  ]
})
export class PatientSignupModule {}
