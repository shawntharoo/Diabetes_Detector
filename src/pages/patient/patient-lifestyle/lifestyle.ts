import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { PatientData } from '../../../providers/patient-data';

@Component({
  selector: 'page-lifestyle',
  templateUrl: 'lifestyle.html'
})
export class LifestylePage {
  lifestyle: any;
  fbsPrediction : any = [];
  hba1cPrediction : any = [];
  serCreatine : any = [];

  constructor(public navCtrl: NavController, public params: NavParams, public viewCtrl: ViewController, public patientData: PatientData) {
    this.lifestyle = params.get('lifestyle');
  }

}
