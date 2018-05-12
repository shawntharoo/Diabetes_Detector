import { NgModule } from '@angular/core';
import { DoctorHistoryPage } from './doctor-history';

@NgModule({
  declarations: [
    DoctorHistoryPage,
  ],
 
  exports: [
    DoctorHistoryPage
  ]
})
export class DoctorHistoryPageModule {}
