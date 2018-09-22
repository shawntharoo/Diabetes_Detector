import { NgModule } from '@angular/core';
import { PatientHomePage } from './patient-home';
import {SymptomsModalPage} from '../../symptoms-modal/symptoms-modal'
@NgModule({
  declarations: [
    PatientHomePage,
  ],
  imports:[
    SymptomsModalPage
  ],
  exports: [
    PatientHomePage
  ]
})
export class PatientHomeModule {}
