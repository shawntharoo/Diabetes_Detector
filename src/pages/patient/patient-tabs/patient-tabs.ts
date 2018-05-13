import { Component } from '@angular/core';
import { PatientReportUploadPage } from '../patient-report-upload/patient-report-upload';
import { DoctorAboutPatientPage } from '../../doctor/about/about';
import { PatientHomePage } from '../../patient/patient-home/patient-home';
import { IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  templateUrl: 'patient-tabs.html'
})
export class PatientTabsPage {
  tab1Root = PatientHomePage;
  tab2Root = DoctorAboutPatientPage;

  constructor() {

  }
}
