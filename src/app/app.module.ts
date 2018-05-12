import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { DoctorAboutPatientPage } from '../pages/doctor/about/about';
import { DoctorHomePage } from '../pages/doctor/doctor-home/doctor-home';
import { PatientHomePage } from '../pages/patient/patient-home/patient-home';
import { DoctorTabsPage } from '../pages/doctor/doctor-tabs/doctor-tabs';
import { DoctorLoginPage } from '../pages/doctor/doctor-login/doctor-login';
import { PatientLoginPage } from '../pages/patient/patient-login/patient-login';
import { ResetPassword }from '../pages/reset-password/reset-password';
import { DoctorSignup } from '../pages/doctor/doctor-signup/doctor-signup';
import { DoctorInitialData } from '../pages/doctor/doctor-initialData/doctor-initialData';
import { PatientInitialData } from '../pages/patient/patient-initialData/patient-initialData';
import { PatientSignup } from '../pages/patient/patient-signup/patient-signup';
import { AuthData } from '../providers/auth-data';
import { PatientData } from '../providers/patient-data';
import { DoctorData } from '../providers/doctor-data';
import { WelcomePage } from '../pages/welcome/welcome';
import { PatientTabsPage } from '../pages/patient/patient-tabs/patient-tabs';

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
    DoctorHomePage,
    DoctorTabsPage,
    DoctorLoginPage,
    ResetPassword,
    DoctorSignup,
    WelcomePage,
    PatientLoginPage,
    PatientSignup,
    PatientTabsPage,
    PatientHomePage,
    DoctorInitialData,
    PatientInitialData
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
    DoctorHomePage,
    DoctorTabsPage,
    DoctorLoginPage,
    ResetPassword,
    DoctorSignup,
    WelcomePage,
    PatientLoginPage,
    PatientSignup,
    PatientTabsPage,
    PatientHomePage,
    DoctorInitialData,
    PatientInitialData
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
