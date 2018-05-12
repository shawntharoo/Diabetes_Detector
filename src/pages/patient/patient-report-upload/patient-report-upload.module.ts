import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PatientReportUploadPage } from './patient-report-upload';

@NgModule({
  declarations: [
    PatientReportUploadPage,
  ],
  imports: [
    IonicPageModule.forChild(PatientReportUploadPage),
  ],
})
export class PatientReportUploadPageModule {}
