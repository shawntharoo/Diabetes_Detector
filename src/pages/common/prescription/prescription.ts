import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { PatientData } from '../../../providers/patient-data';

@Component({
  selector: 'page-prescription',
  templateUrl: 'prescription.html'
})
export class Prescription {
  report: any;
  prescription : any;

  constructor(public navCtrl: NavController, public params: NavParams, public viewCtrl: ViewController, public patientDta: PatientData) {
    this.report = params.get('Report');
    this.patientDta.patientPrescription(this.report.prescription).valueChanges().subscribe(prescription => {
    console.log(prescription);
      this.prescription = prescription;
    })
  }

}
