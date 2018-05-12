import { NgModule } from '@angular/core';
import { PatientHomePage } from './patient-home';

@NgModule({
  declarations: [
    PatientHomePage,
  ],
 
  exports: [
    PatientHomePage
  ]
})
export class PatientHomeModule {}
