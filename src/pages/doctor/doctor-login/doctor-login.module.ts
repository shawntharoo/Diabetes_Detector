import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DoctorLoginPage } from './doctor-login';

@NgModule({
  declarations: [
    DoctorLoginPage,
  ],
  imports: [
    IonicPageModule.forChild(DoctorLoginPage),
  ],
})
export class DoctorLoginPageModule {}
