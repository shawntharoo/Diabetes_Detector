import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-doctorpatienthistory',
  templateUrl: 'doctor-patienthistory.html'
})
export class DoctorPatientHistoryPage {
patient: any;
  constructor(public navCtrl: NavController, public params: NavParams) {
    this.patient = params.get('patient');
  }

}
