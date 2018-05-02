import { Component } from '@angular/core';

import { DoctorAboutPatientPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { DoctorHomePage } from '../doctor-home/doctor-home';

@Component({
  templateUrl: 'doctor-tabs.html'
})
export class DoctorTabsPage {

  tab1Root = DoctorHomePage;
  tab2Root = DoctorAboutPatientPage;
  tab3Root = ContactPage;

  constructor() {

  }
}
