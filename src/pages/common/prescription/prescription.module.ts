import { NgModule } from '@angular/core';
import { Prescription } from './prescription';

@NgModule({
  declarations: [
    Prescription,
  ],
 
  exports: [
    Prescription
  ]
})
export class PrescriptionPageModule {}
