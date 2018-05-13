import { NgModule } from '@angular/core';
import { DoctorHomePage } from './doctor-home';

@NgModule({
  declarations: [
    DoctorHomePage,
  ],
 
  exports: [
    DoctorHomePage
  ]
})
export class DoctorHomeModule {}
