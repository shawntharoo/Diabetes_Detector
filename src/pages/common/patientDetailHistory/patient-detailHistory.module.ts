import { NgModule } from '@angular/core';
import { PatientDetailHistoryPage } from './patient-detailHistory';

@NgModule({
  declarations: [
    PatientDetailHistoryPage,
  ],
 
  exports: [
    PatientDetailHistoryPage
  ]
})
export class PatientDetailHistoryPageModule {}
