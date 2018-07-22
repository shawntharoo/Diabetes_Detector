import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { PatientData } from '../../../providers/patient-data';

@Component({
  selector: 'page-predictionReport',
  templateUrl: 'prediction-report.html'
})
export class PredictionReportPage {
  patient: any;
  fbsPrediction : any = [];
  hba1cPrediction : any = [];
  serCreatine : any = [];

  constructor(public navCtrl: NavController, public params: NavParams, public viewCtrl: ViewController, public patientData: PatientData) {
    this.patient = params.get('lastreport');
    this.predictionReport();
  }

  predictionReport(){
    this.patientData.patientPredictionReport().valueChanges().subscribe(allUserData => {
      console.log(allUserData);
      for(var i=0; i< allUserData.length; i++){
        if((allUserData[i]['fbs'] <= this.patient.FBS[0].fbs + 5) && (allUserData[i]['fbs'] >= this.patient.FBS[0].fbs - 5) && (allUserData[i]['ppbs'] <= this.patient.FBS[0].ppbs + 5) && (allUserData[i]['ppbs'] >= this.patient.FBS[0].ppbs - 5)){
          if(this.fbsPrediction.length == 0)
          this.fbsPrediction.push(allUserData[i])
        }
        if((allUserData[i]['hba1c'] <= this.patient.HBA1C[0].hb1ac + 2) && (allUserData[i]['hba1c'] >= this.patient.HBA1C[0].hb1ac - 2) ){
          if(this.hba1cPrediction.length == 0)
          this.hba1cPrediction.push(allUserData[i])
        }
        if((allUserData[i]['ser_cret'] <= this.patient.SerCreatine[0].serCret + 0.1) && (allUserData[i]['ser_cret'] >= this.patient.SerCreatine[0].serCret - 0.1) ){
          if(this.serCreatine.length == 0)
          this.serCreatine.push(allUserData[i])
        }
      }
    })
  }

}
