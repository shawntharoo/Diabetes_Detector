import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DoctorLoginPage } from '../doctor/doctor-login/doctor-login';
import { PatientLoginPage } from '../patient/patient-login/patient-login';

@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {

  constructor(public navCtrl: NavController) {

  }

  doctor_login(){
    this.navCtrl.push(DoctorLoginPage, {}, {animate: false});
  }

  patient_login(){
    this.navCtrl.push(PatientLoginPage, {}, {animate: false});
    }
  

}
