import { Component } from '@angular/core';
import { ReportUploadPage } from '../report-upload/report-upload';
import { DoctorAboutPatientPage } from '../../doctor/about/about';
import { ContactPage } from '../../doctor/contact/contact';
import { PatientHomePage } from '../../patient/patient-home/patient-home';

@Component({
  templateUrl: 'patient-tabs.html'
})
export class PatientTabsPage {
  tab1Root = PatientHomePage;
  tab2Root = DoctorAboutPatientPage;
  tab3Root = ContactPage;

  constructor() {

  }
}
