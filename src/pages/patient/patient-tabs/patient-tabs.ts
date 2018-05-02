import { Component } from '@angular/core';
import { ReportUploadPage } from '../report-upload/report-upload';
import { DoctorAboutPatientPage } from '../../doctor/about/about';
import { ContactPage } from '../../doctor/contact/contact';
import { PatientHomePage } from '../../patient/patient-home/patient-home';

@Component({
  templateUrl: 'patient-tabs.html'
})
export class PatientTabsPage {
<<<<<<< HEAD
  tab1Root=ReportUploadPage;
=======
  tab1Root = PatientHomePage;
>>>>>>> 8f3733c2ebec174c4b296058b0feeadf881ba7ee
  tab2Root = DoctorAboutPatientPage;
  tab3Root = ContactPage;

  constructor() {

  }
}
