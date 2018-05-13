import { NgModule } from '@angular/core';
import { DoctorInitialData } from './doctor-initialData';

@NgModule({
  declarations: [
    DoctorInitialData,
  ],
 
  exports: [
    DoctorInitialData
  ]
})
export class DoctorInitialDataModule {}
