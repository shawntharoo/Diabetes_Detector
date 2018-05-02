import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReportUploadPage } from './report-upload';

@NgModule({
  declarations: [
    ReportUploadPage,
  ],
  imports: [
    IonicPageModule.forChild(ReportUploadPage),
  ],
})
export class ReportUploadPageModule {}
