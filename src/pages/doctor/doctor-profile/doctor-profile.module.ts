import { NgModule } from '@angular/core';
import { DoctorProfilePage } from './doctor-profile';

@NgModule({
  declarations: [
    DoctorProfilePage,
  ],
 
  exports: [
    DoctorProfilePage
  ]
})
export class DoctorProfileModule {}
