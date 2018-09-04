import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { PatientData } from '../../../providers/patient-data';
import { Chart } from 'chart.js';
import { PatientDetailHistoryPage } from '../patientDetailHistory/patient-detailHistory';
import { AngularFireAuth } from 'angularfire2/auth';
import { PredictionReportPage } from '../predictionReport/prediction-report';
import { Prescription } from '../prescription/prescription';
import { LifestylePage }  from '../../patient/patient-lifestyle/lifestyle';
@Component({
  selector: 'page-patienthistory',
  templateUrl: 'patienthistory.html'
})

export class PatientHistoryPage {
  @ViewChild('FBSlineCanvas') FBSlineCanvas;
  @ViewChild('HBA1ClineCanvas') HBA1ClineCanvas;
  @ViewChild('SeCrlineCanvas') SeCrlineCanvas;
  FBSlineChart: any;
  HBA1ClineChart: any;
  SeCrlineChart: any;

  //HBA1C Report variables
  hba1cCount: any = [];
  HBA1CchartLabels: any = [];
  HBA1Chistory: any;
  hba1cForecast: any;
  HBA1CPredict: any = [];

  //FBS Report variables
  fbsCount: any = [];
  ppbsCount: any = [];
  FBSchartLabels: any = [];
  FBShistory: any;
  fbsForecast: any;
  FBSPredict : any = [];
  lifestyle : any = null;


  //Serum Creatine Report variables
  serCreCount: any = [];
  seruricAcidCount: any = [];
  SerCreatineChartVariables: any = [];
  SerCreatineHistory: any;
  serCreatineForecast: any;
  SerCreatinePredict : any = [];

  patientData: any;
  firstReport: any = {};

  constructor(public navCtrl: NavController, private navParams: NavParams, private patientDta: PatientData, public modalCtrl: ModalController, public afAuth: AngularFireAuth) {

  }

  getTime(dateUnFormatted?: Date) {
    let date = new Date(dateUnFormatted);
    return date != null ? date.getTime() : 0;
  }

  formatDate(date) {
    var monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    return year + '-' + monthIndex + '-' + day;
  }

  ionViewDidLoad() {

    this.patientData = this.navParams.get('patient');
    if (this.patientData == undefined) {
      console.log("inside patient")
      this.afAuth.authState.subscribe(user => {
        var key = user.email.replace(/\./g, ',');
        this.patientDta.patientHBA1CReport(key).valueChanges().subscribe(HBA1Chistory => {

          HBA1Chistory.sort((a: Date, b: Date) => {
            return this.getTime(a['date']) - this.getTime(b['date']);
          });

          for (var i = 0; i < HBA1Chistory.length; i++) {
            this.hba1cCount.push(HBA1Chistory[i]['hb1ac']);
            this.HBA1CchartLabels.push(HBA1Chistory[i]['date']);
            let fDateH;
            let predictVal = [];
            fDateH = this.formatDate(new Date(HBA1Chistory[i]['date']));
  
            predictVal.push(fDateH);
            predictVal.push(HBA1Chistory[i]['hb1ac']);
            this.HBA1CPredict.push(predictVal);
          }
          this.patientDta.patientPredictedValue(this.HBA1CPredict).then(resp => {
            this.hba1cForecast = resp['forecast'];
          })

          this.HBA1Chistory = Object.assign([], HBA1Chistory);
          if (this.HBA1Chistory.length != 0) {
            this.firstReport.HBA1C = this.HBA1Chistory.slice(this.HBA1Chistory.length - 1);
            this.HBA1Chistory.splice(-1, 1);
          }

          this.HBA1ClineChart = new Chart(this.HBA1ClineCanvas.nativeElement, {
            type: 'line',
            data: {
              labels: this.HBA1CchartLabels,
              datasets: [
                {
                  label: "HBA1C",
                  fill: false,
                  lineTension: 0.1,
                  backgroundColor: "rgba(75,192,192,0.4)",
                  borderColor: "rgba(75,192,192,1)",
                  borderCapStyle: 'butt',
                  borderDash: [],
                  borderDashOffset: 0.0,
                  borderJoinStyle: 'miter',
                  pointBorderColor: "rgba(75,192,192,1)",
                  pointBackgroundColor: "#fff",
                  pointBorderWidth: 1,
                  pointHoverRadius: 5,
                  pointHoverBackgroundColor: "rgba(75,192,192,1)",
                  pointHoverBorderColor: "rgba(220,220,220,1)",
                  pointHoverBorderWidth: 2,
                  pointRadius: 1,
                  pointHitRadius: 10,
                  data: this.hba1cCount,
                  spanGaps: false,
                }
              ]
            }
          });

        })

        this.patientDta.patientFBSReport(key).valueChanges().subscribe(FBShistory => {
          FBShistory.sort((a: Date, b: Date) => {
            return this.getTime(a['date']) - this.getTime(b['date']);
          });
          for (var i = 0; i < FBShistory.length; i++) {
            this.fbsCount.push(FBShistory[i]['fbs']);
            this.ppbsCount.push(FBShistory[i]['ppbs']);
            this.FBSchartLabels.push(FBShistory[i]['date']);
            let fDateH;
            let predictVal = [];
            fDateH = this.formatDate(new Date(FBShistory[i]['date']));
  
            predictVal.push(fDateH);
            predictVal.push(FBShistory[i]['fbs']);
            this.FBSPredict.push(predictVal);
          }
          this.patientDta.patientPredictedValue(this.FBSPredict).then(resp => {
            this.fbsForecast = resp['forecast'];
          })
          this.FBShistory = Object.assign([], FBShistory);
          if (this.FBShistory.length != 0) {
            this.firstReport.FBS = this.FBShistory.slice(this.FBShistory.length - 1);
            this.FBShistory.splice(-1, 1);

            this.patientDta.lifestyleSuggesions().valueChanges().subscribe(resp => {
              for(var z=0; z< resp.length; z++){
                let fbsVal = this.firstReport.FBS[0].fbs;
                if(fbsVal <= resp[z]['max_value'] && fbsVal >= resp[z]['min_value']){
                  this.lifestyle = resp[z];
                }
              }
            })
          }

          this.FBSlineChart = new Chart(this.FBSlineCanvas.nativeElement, {
            type: 'line',
            data: {
              labels: this.FBSchartLabels,
              datasets: [
                {
                  label: "FBS",
                  fill: false,
                  lineTension: 0.1,
                  backgroundColor: "rgba(255,0,0,0.6)",
                  borderColor: "rgba(255,0,0,1)",
                  borderCapStyle: 'butt',
                  borderDash: [],
                  borderDashOffset: 0.0,
                  borderJoinStyle: 'miter',
                  pointBorderColor: "rgba(255,0,0,1)",
                  pointBackgroundColor: "#fff",
                  pointBorderWidth: 1,
                  pointHoverRadius: 5,
                  pointHoverBackgroundColor: "rgba(255,0,0,1)",
                  pointHoverBorderColor: "rgba(255,0,0,1)",
                  pointHoverBorderWidth: 2,
                  pointRadius: 1,
                  pointHitRadius: 10,
                  data: this.fbsCount,
                  spanGaps: false,
                },
                {
                  label: "PPBS",
                  fill: false,
                  lineTension: 0.1,
                  backgroundColor: "rgba(0,0,255,0.5)",
                  borderColor: "rgba(0,0,255,0.9)",
                  borderCapStyle: 'butt',
                  borderDash: [],
                  borderDashOffset: 0.0,
                  borderJoinStyle: 'miter',
                  pointBorderColor: "rgba(0,0,255,0.9)",
                  pointBackgroundColor: "#fff",
                  pointBorderWidth: 1,
                  pointHoverRadius: 5,
                  pointHoverBackgroundColor: "rgba(0,0,255,0.9)",
                  pointHoverBorderColor: "rgba(0,0,255,0.9)",
                  pointHoverBorderWidth: 2,
                  pointRadius: 1,
                  pointHitRadius: 10,
                  data: this.ppbsCount,
                  spanGaps: false,
                }
              ]
            }
          });

        })

        this.patientDta.patientSeCrReport(key).valueChanges().subscribe(SerCreatineHistory => {
          SerCreatineHistory.sort((a: Date, b: Date) => {
            return this.getTime(a['date']) - this.getTime(b['date']);
          });
          for (var i = 0; i < SerCreatineHistory.length; i++) {
            this.serCreCount.push(SerCreatineHistory[i]['serCret']);
            this.seruricAcidCount.push(SerCreatineHistory[i]['serUricAcid']);
            this.SerCreatineChartVariables.push(SerCreatineHistory[i]['date']);
            let fDateH;
            let predictVal = [];
            fDateH = this.formatDate(new Date(SerCreatineHistory[i]['date']));
  
            predictVal.push(fDateH);
            predictVal.push(SerCreatineHistory[i]['serCret']);
            this.SerCreatinePredict.push(predictVal);
          }
          this.patientDta.patientPredictedValue(this.SerCreatinePredict).then(resp => {
            this.serCreatineForecast = resp['forecast'];
          })
          this.SerCreatineHistory = Object.assign([], SerCreatineHistory);
          if (this.SerCreatineHistory.length != 0) {
            this.firstReport.SerCreatine = this.SerCreatineHistory.slice(this.SerCreatineHistory.length - 1);
            this.SerCreatineHistory.splice(-1, 1);
          }

          this.SeCrlineChart = new Chart(this.SeCrlineCanvas.nativeElement, {
            type: 'line',
            data: {
              labels: this.SerCreatineChartVariables,
              datasets: [
                {
                  label: "Serum Creatinine",
                  fill: false,
                  lineTension: 0.1,
                  backgroundColor: "rgba(128,0,0,0.6)",
                  borderColor: "rgba(125,100,100,20)",
                  borderCapStyle: 'butt',
                  borderDash: [],
                  borderDashOffset: 0.0,
                  borderJoinStyle: 'miter',
                  pointBorderColor: "rgba(125,100,100,20)",
                  pointBackgroundColor: "#fff",
                  pointBorderWidth: 1,
                  pointHoverRadius: 5,
                  pointHoverBackgroundColor: "rgba(125,100,100,20)",
                  pointHoverBorderColor: "rgba(220,220,220,1)",
                  pointHoverBorderWidth: 2,
                  pointRadius: 1,
                  pointHitRadius: 10,
                  data: this.serCreCount,
                  spanGaps: false,
                },
                {
                  label: "Serum Uric Acid",
                  fill: false,
                  lineTension: 0.1,
                  backgroundColor: "rgba(0,255,0,0.5)",
                  borderColor: "rgba(0,255,0,0.9)",
                  borderCapStyle: 'butt',
                  borderDash: [],
                  borderDashOffset: 0.0,
                  borderJoinStyle: 'miter',
                  pointBorderColor: "rgba(0,255,0,0.9)",
                  pointBackgroundColor: "#fff",
                  pointBorderWidth: 1,
                  pointHoverRadius: 5,
                  pointHoverBackgroundColor: "rgba(0,255,0,0.9)",
                  pointHoverBorderColor: "rgba(0,255,0,0.9)",
                  pointHoverBorderWidth: 2,
                  pointRadius: 1,
                  pointHitRadius: 10,
                  data: this.seruricAcidCount,
                  spanGaps: false,
                }
              ]
            }
          });

        })
      });
    } else {














      let patient = this.patientData;
      this.patientDta.patientHBA1CReport(patient.key).valueChanges().subscribe(HBA1Chistory => {
        HBA1Chistory.sort((a: Date, b: Date) => {
          return this.getTime(a['date']) - this.getTime(b['date']);
        });
        for (var i = 0; i < HBA1Chistory.length; i++) {
          this.hba1cCount.push(HBA1Chistory[i]['hb1ac']);
          this.HBA1CchartLabels.push(HBA1Chistory[i]['date']);
          let fDateH;
          let predictVal = [];
          fDateH = this.formatDate(new Date(HBA1Chistory[i]['date']));

          predictVal.push(fDateH);
          predictVal.push(HBA1Chistory[i]['hb1ac']);
          this.HBA1CPredict.push(predictVal);
        }
        this.patientDta.patientPredictedValue(this.HBA1CPredict).then(resp => {
          this.hba1cForecast = resp['forecast'];
        })

        this.HBA1Chistory = Object.assign([], HBA1Chistory);
        if (this.HBA1Chistory.length != 0) {
          this.firstReport.HBA1C = this.HBA1Chistory.slice(this.HBA1Chistory.length - 1);
          this.HBA1Chistory.splice(-1, 1);
        }

        this.HBA1ClineChart = new Chart(this.HBA1ClineCanvas.nativeElement, {
          type: 'line',
          data: {
            labels: this.HBA1CchartLabels,
            datasets: [
              {
                label: "HBA1C",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(75,192,192,0.4)",
                borderColor: "rgba(75,192,192,1)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(75,192,192,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: this.hba1cCount,
                spanGaps: false,
              }
            ]
          }
        });

      })

      this.patientDta.patientFBSReport(patient.key).valueChanges().subscribe(FBShistory => {
        FBShistory.sort((a: Date, b: Date) => {
          return this.getTime(a['date']) - this.getTime(b['date']);
        });
        var fDate;
        for (var i = 0; i < FBShistory.length; i++) {
          this.fbsCount.push(FBShistory[i]['fbs']);
          this.ppbsCount.push(FBShistory[i]['ppbs']);
          this.FBSchartLabels.push(FBShistory[i]['date']);
          let fDateH;
          let predictVal = [];
          fDateH = this.formatDate(new Date(FBShistory[i]['date']));

          predictVal.push(fDateH);
          predictVal.push(FBShistory[i]['fbs']);
          this.FBSPredict.push(predictVal);
        }
        this.patientDta.patientPredictedValue(this.FBSPredict).then(resp => {
          this.fbsForecast = resp['forecast'];
        })
        this.FBShistory = Object.assign([], FBShistory);
        if (this.FBShistory.length != 0) {
          this.firstReport.FBS = this.FBShistory.slice(this.FBShistory.length - 1);
          this.FBShistory.splice(-1, 1);
        }

        this.FBSlineChart = new Chart(this.FBSlineCanvas.nativeElement, {
          type: 'line',
          data: {
            labels: this.FBSchartLabels,
            datasets: [
              {
                label: "FBS",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(255,0,0,0.6)",
                borderColor: "rgba(255,0,0,1)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(255,0,0,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(255,0,0,1)",
                pointHoverBorderColor: "rgba(255,0,0,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: this.fbsCount,
                spanGaps: false,
              },
              {
                label: "PPBS",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(0,0,255,0.5)",
                borderColor: "rgba(0,0,255,0.9)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(0,0,255,0.9)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(0,0,255,0.9)",
                pointHoverBorderColor: "rgba(0,0,255,0.9)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: this.ppbsCount,
                spanGaps: false,
              }
            ]
          }
        });

      })

      this.patientDta.patientSeCrReport(patient.key).valueChanges().subscribe(SerCreatineHistory => {
        SerCreatineHistory.sort((a: Date, b: Date) => {
          return this.getTime(a['date']) - this.getTime(b['date']);
        });
        for (var i = 0; i < SerCreatineHistory.length; i++) {
          this.serCreCount.push(SerCreatineHistory[i]['serCret']);
          this.seruricAcidCount.push(SerCreatineHistory[i]['serUricAcid']);
          this.SerCreatineChartVariables.push(SerCreatineHistory[i]['date']);
          let fDateH;
          let predictVal = [];
          fDateH = this.formatDate(new Date(SerCreatineHistory[i]['date']));

          predictVal.push(fDateH);
          predictVal.push(SerCreatineHistory[i]['serCret']);
          this.SerCreatinePredict.push(predictVal);
        }
        this.patientDta.patientPredictedValue(this.SerCreatinePredict).then(resp => {
          this.serCreatineForecast = resp['forecast'];
        })
        this.SerCreatineHistory = Object.assign([], SerCreatineHistory);
        if (this.SerCreatineHistory.length != 0) {
          this.firstReport.SerCreatine = this.SerCreatineHistory.slice(this.SerCreatineHistory.length - 1);
          this.SerCreatineHistory.splice(-1, 1);
        }

        this.SeCrlineChart = new Chart(this.SeCrlineCanvas.nativeElement, {
          type: 'line',
          data: {
            labels: this.SerCreatineChartVariables,
            datasets: [
              {
                label: "Serum Creatinine",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(128,0,0,0.6)",
                borderColor: "rgba(125,100,100,20)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(125,100,100,20)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(125,100,100,20)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: this.serCreCount,
                spanGaps: false,
              },
              {
                label: "Serum Uric Acid",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(0,255,0,0.5)",
                borderColor: "rgba(0,255,0,0.9)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(0,255,0,0.9)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(0,255,0,0.9)",
                pointHoverBorderColor: "rgba(0,255,0,0.9)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: this.seruricAcidCount,
                spanGaps: false,
              }
            ]
          }
        });

      })
    }




  }

  openHistoryModal(type) {
    var historydata = [];
    if (type == 'FBS') {
      historydata = this.FBShistory;
    } else if (type == 'Serum') {
      historydata = this.SerCreatineHistory;
    } else if (type == 'HB1AC') {
      historydata = this.HBA1Chistory;
    }
    let modal = this.modalCtrl.create(PatientDetailHistoryPage, { history: historydata, type: type });
    modal.present();
  }

  viewPredictions() {
    let modal = this.modalCtrl.create(PredictionReportPage, { lastreport: this.firstReport });
    modal.present();
  }

  viewPrescription(report) {
    let modal = this.modalCtrl.create(Prescription, { Report: report });
    modal.present();
  }

  openLifestyle(lifestyle){
    let modal = this.modalCtrl.create(LifestylePage, { lifestyle: lifestyle });
    modal.present();
  }

}
