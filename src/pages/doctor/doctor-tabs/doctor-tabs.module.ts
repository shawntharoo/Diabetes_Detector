import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DoctorTabsPage } from './doctor-tabs';

@NgModule({
  declarations: [
    DoctorTabsPage,
  ],
 
  exports: [
    DoctorTabsPage
  ]
})
export class DoctorTabsModule {}
