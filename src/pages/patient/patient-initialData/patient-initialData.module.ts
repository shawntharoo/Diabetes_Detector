import { NgModule } from '@angular/core';
import { PatientInitialData } from './patient-initialData';

@NgModule({
  declarations: [
    PatientInitialData,
  ],
 
  exports: [
    PatientInitialData
  ]
})
export class PatientInitialDataModule {}
