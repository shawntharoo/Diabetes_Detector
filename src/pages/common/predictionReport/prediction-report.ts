import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-predictionReport',
  templateUrl: 'prediction-report.html'
})
export class PredictionReportPage {
  patient: any;
  type: any;
  constructor(public navCtrl: NavController, public params: NavParams, public viewCtrl: ViewController) {
    this.patient = params.get('lastreport');
  }

}
