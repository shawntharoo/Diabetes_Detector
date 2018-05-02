import { Component } from '@angular/core';

import { DoctorAboutPatientPage } from '../../doctor/about/about';
import { ContactPage } from '../../doctor/contact/contact';

@Component({
  templateUrl: 'patient-tabs.html'
})
export class PatientTabsPage {

  tab2Root = DoctorAboutPatientPage;
  tab3Root = ContactPage;

  constructor() {

  }
}
