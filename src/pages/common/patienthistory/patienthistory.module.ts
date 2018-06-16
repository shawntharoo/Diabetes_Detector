import { NgModule } from '@angular/core';
import { PatientHistoryPage } from './patienthistory';

@NgModule({
  declarations: [
    PatientHistoryPage,
  ],
 
  exports: [
    PatientHistoryPage
  ]
})
export class PatientHistoryPageModule {}
