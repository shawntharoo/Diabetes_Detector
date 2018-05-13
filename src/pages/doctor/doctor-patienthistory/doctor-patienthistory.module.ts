import { NgModule } from '@angular/core';
import { DoctorPatientHistoryPage } from './doctor-patienthistory';

@NgModule({
  declarations: [
    DoctorPatientHistoryPage,
  ],
 
  exports: [
    DoctorPatientHistoryPage
  ]
})
export class DoctorPatientHistoryPageModule {}
