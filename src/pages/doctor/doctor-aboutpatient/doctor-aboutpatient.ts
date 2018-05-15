import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-doctoraboutpatient',
  templateUrl: 'doctor-aboutpatient.html'
})
export class DoctorAboutPatientPage {
  patient: any;
  constructor(public navCtrl: NavController, public params: NavParams) {
    this.patient = params.get('patient');
  }

}
