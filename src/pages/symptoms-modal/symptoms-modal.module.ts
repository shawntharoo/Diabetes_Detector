import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SymptomsModalPage } from './symptoms-modal';

@NgModule({
  declarations: [
    SymptomsModalPage,
  ],
  imports: [
    IonicPageModule.forChild(SymptomsModalPage),
  ],
})
export class SymptomsModalPageModule {}
