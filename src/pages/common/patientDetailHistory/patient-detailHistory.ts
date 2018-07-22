import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { Prescription } from '../prescription/prescription';

@Component({
  selector: 'page-patientDetailHistory',
  templateUrl: 'patient-detailHistory.html'
})
export class PatientDetailHistoryPage {
  patient: any;
  type: any;
  constructor(public navCtrl: NavController, public params: NavParams, public viewCtrl: ViewController , public modalCtrl: ModalController) {
    this.patient = params.get('history');
    this.type = params.get('type');
  }

  viewPrescription(report){
    let modal = this.modalCtrl.create(Prescription, { Report : report });
    modal.present();
  }

}
