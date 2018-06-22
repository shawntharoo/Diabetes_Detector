import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-patientDetailHistory',
  templateUrl: 'patient-detailHistory.html'
})
export class PatientDetailHistoryPage {
  patient: any;
  type: any;
  constructor(public navCtrl: NavController, public params: NavParams, public viewCtrl: ViewController) {
    this.patient = params.get('history');
    this.type = params.get('type');
  }

}
