import { Component } from '@angular/core';

import { DoctorHistoryPage } from '../doctor-history/doctor-history';
import { DoctorHomePage } from '../doctor-home/doctor-home';
import { IonicPage } from 'ionic-angular';
import { DoctorProfilePage } from '../doctor-profile/doctor-profile';

@IonicPage()
@Component({
  templateUrl: 'doctor-tabs.html'
})
export class DoctorTabsPage {

  tab1Root = DoctorHomePage;
  tab2Root = DoctorProfilePage;
  tab3Root = DoctorHistoryPage;

  constructor() {

  }
}
