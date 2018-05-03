import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { WelcomePage } from '../pages/welcome/welcome';
import { DoctorTabsPage } from '../pages/doctor/doctor-tabs/doctor-tabs';
import { AuthData } from '../providers/auth-data';
import { PatientData } from '../providers/patient-data';
import { DoctorData } from '../providers/doctor-data';
import { AngularFireAuth } from 'angularfire2/auth';
import { PatientTabsPage } from '../pages/patient/patient-tabs/patient-tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = WelcomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public afAuth: AngularFireAuth, public authData: AuthData
    , public patientData: PatientData, public doctorData: DoctorData) {
    afAuth.authState.subscribe(user => {
      if (!user) {
        this.rootPage = WelcomePage;
    } else {
      this.doctorData.logginDoctor(user.email).valueChanges().subscribe(item => {
        if(item != null){
          this.rootPage = DoctorTabsPage;
        }
      });
      this.patientData.logginPatient(user.email).valueChanges().subscribe(item1 => {
        if(item1 != null){
          this.rootPage = PatientTabsPage;
        }
      });
    }
    });
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

}
