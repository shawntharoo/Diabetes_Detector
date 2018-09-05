import { NgModule, ErrorHandler, forwardRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { DoctorAboutPatientPage } from '../pages/doctor/doctor-aboutpatient/doctor-aboutpatient';
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
import { PatientPaymentPage } from '../pages/patient/patient-payment/patient-payment';
import { AuthData } from '../providers/auth-data';
import { PatientData } from '../providers/patient-data';
import { DoctorData } from '../providers/doctor-data';
import { WelcomePage } from '../pages/welcome/welcome';
import { PatientTabsPage } from '../pages/patient/patient-tabs/patient-tabs';
import { DoctorHistoryPage } from '../pages/doctor/doctor-history/doctor-history';
import { PatientHistoryPage } from '../pages/common/patienthistory/patienthistory';
import { LifestylePage } from '../pages/patient/patient-lifestyle/lifestyle';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { firebaseConfig } from '../config';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { Camera } from '@ionic-native/camera';
import { GoogleCloudVisionServiceProvider } from '../providers/google-cloud-vision-service';
import { HttpModule } from '@angular/http';
import { PatientDetailHistoryPage } from '../pages/common/patientDetailHistory/patient-detailHistory';
import { PatientProfilePage } from '../pages/patient/patient-profile/patient-profile';
import { DoctorProfilePage } from '../pages/doctor/doctor-profile/doctor-profile';
import { PredictionReportPage } from '../pages/common/predictionReport/prediction-report';
import { EditPatientProfilePage } from '../pages/patient/patient-profile/edit-patient-profile/edit-patient-profile';
import { EditDoctorProfilePage } from '../pages/doctor/doctor-profile/edit-doctor-profile/edit-doctor-profile';
import { Prescription } from '../pages/common/prescription/prescription';
import { GetTextFromReportProvider } from '../providers/get-text-from-report/get-text-from-report';
import { ConstantsProvider } from '../providers/constants/constants';


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
    PatientPaymentPage,
    DoctorInitialData,
    PatientInitialData,
    DoctorHistoryPage,
    PatientHistoryPage,
    PatientDetailHistoryPage,
    PatientProfilePage,
    DoctorProfilePage,
    PredictionReportPage,
    EditPatientProfilePage,
    EditDoctorProfilePage,
    Prescription,
    LifestylePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,
      {
        tabsPlacement: 'top',
        platforms:{
          ios:{
            tabsPlacement:'bottom'
          }
        }
      }),
    AngularFireModule.initializeApp(firebaseConfig.fire),
    HttpModule,
    HttpClientModule
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
    PatientPaymentPage,
    DoctorInitialData,
    PatientInitialData,
    DoctorHistoryPage,
    PatientHistoryPage,
    PatientDetailHistoryPage,
    PatientProfilePage,
    DoctorProfilePage,
    PredictionReportPage,
    EditPatientProfilePage,
    EditDoctorProfilePage,
    Prescription,
    LifestylePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AngularFireAuth,
    AngularFireDatabase,
    AuthData,
    PatientData,
    DoctorData,
    Camera,
    GoogleCloudVisionServiceProvider,
    GetTextFromReportProvider,
    ConstantsProvider
  ]
})
export class AppModule {}
