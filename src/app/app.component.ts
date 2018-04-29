import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { Login } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import firebase from 'firebase';


import { AuthData } from '../providers/auth-data';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    public authData: AuthData) {

      // Initialize Firebase
      var config = {
        apiKey: "AIzaSyAAfOhc3gILLF7DgWv4ahNj1X9LOaz78mk",
        authDomain: "diabetesdetector-67dbf.firebaseapp.com",
        databaseURL: "https://diabetesdetector-67dbf.firebaseio.com",
        projectId: "diabetesdetector-67dbf",
        storageBucket: "diabetesdetector-67dbf.appspot.com",
        messagingSenderId: "647960114368"
      };
      firebase.initializeApp(config);
      firebase.auth().onAuthStateChanged((user) => {

          if (!user) {
              console.log("not login");
              this.rootPage = Login;


          } else {
              console.log("login");
              //this.authData.logoutUser();
              this.rootPage = TabsPage;


          }

      });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
