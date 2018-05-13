import { NgModule } from '@angular/core';
import { PatientTabsPage } from './patient-tabs';

@NgModule({
  declarations: [
    PatientTabsPage,
  ],
 
  exports: [
    PatientTabsPage
  ]
})
export class PatientTabsModule {}
