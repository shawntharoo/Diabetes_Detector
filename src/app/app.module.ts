import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { DoctorAboutPatientPage } from '../pages/doctor/about/about';
import { ContactPage } from '../pages/doctor/contact/contact';
import { DoctorHomePage } from '../pages/doctor/home/home';
import { DoctorTabsPage } from '../pages/doctor/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { ResetPassword }from '../pages/reset-password/reset-password';
import { Signup } from '../pages/signup/signup';
import { AuthData } from '../providers/auth-data';
import { PatientData } from '../providers/patient-data';
import { DoctorData } from '../providers/doctor-data';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { firebaseConfig } from '../config';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    DoctorAboutPatientPage,
    ContactPage,
    DoctorHomePage,
    DoctorTabsPage,
    LoginPage,
    ResetPassword,
    Signup
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig.fire),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    DoctorAboutPatientPage,
    ContactPage,
    DoctorHomePage,
    DoctorTabsPage,
    LoginPage,
    ResetPassword,
    Signup
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AngularFireAuth,
    AngularFireDatabase,
    AuthData,
    PatientData,
    DoctorData
  ]
})
export class AppModule {}
