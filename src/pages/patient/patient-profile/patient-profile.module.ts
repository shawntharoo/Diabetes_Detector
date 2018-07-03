import { NgModule } from '@angular/core';
import { PatientProfilePage } from './patient-profile';

@NgModule({
  declarations: [
    PatientProfilePage,
  ],
 
  exports: [
    PatientProfilePage
  ]
})
export class PatientProfileModule {}
