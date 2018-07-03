import { Component } from '@angular/core';
import { PatientReportUploadPage } from '../patient-report-upload/patient-report-upload';
import { PatientHomePage } from '../../patient/patient-home/patient-home';
import { IonicPage } from 'ionic-angular';
import { PatientHistoryPage } from '../../common/patienthistory/patienthistory';
import { PatientProfilePage } from '../patient-profile/patient-profile';

@IonicPage()
@Component({
  templateUrl: 'patient-tabs.html'
})
export class PatientTabsPage {
  tab1Root = PatientHomePage;
  tab2Root = PatientProfilePage
  tab3Root = PatientHistoryPage;

  constructor() {

  }
}
