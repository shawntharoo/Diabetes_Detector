import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { DoctorTabsPage } from '../pages/doctor/tabs/tabs';
import { AuthData } from '../providers/auth-data';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public afAuth: AngularFireAuth, public authData: AuthData) {
    afAuth.authState.subscribe(user => {
      if (!user) {
        this.rootPage = LoginPage;
    } else {
        this.rootPage = DoctorTabsPage;
    }
    });
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

}
