import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DoctorViewReportPage } from './doctor-view-report';

@NgModule({
  declarations: [
    DoctorViewReportPage,
  ],
  imports: [
    IonicPageModule.forChild(DoctorViewReportPage),
  ],
})
export class DoctorViewReportPageModule {}
