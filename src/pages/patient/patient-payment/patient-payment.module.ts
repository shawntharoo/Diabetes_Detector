import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PatientPaymentPage } from './patient-payment';

@NgModule({
  declarations: [
    PatientPaymentPage,
  ],
  imports: [
    IonicPageModule.forChild(PatientPaymentPage),
  ],
})
export class PatientPaymentPageModule {}
