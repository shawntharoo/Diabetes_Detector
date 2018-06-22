import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-patientDetailHistory',
  templateUrl: 'patient-detailHistory.html'
})
export class PatientDetailHistoryPage {
  patient: any;
  constructor(public navCtrl: NavController, public params: NavParams) {
    this.patient = params.get('patient');
  }

}
