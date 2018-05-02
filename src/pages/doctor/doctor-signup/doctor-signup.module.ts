import { NgModule } from '@angular/core';
import { DoctorSignup } from './doctor-signup';

@NgModule({
  declarations: [
    DoctorSignup,
  ],
 
  exports: [
    DoctorSignup
  ]
})
export class DoctorSignupModule {}
