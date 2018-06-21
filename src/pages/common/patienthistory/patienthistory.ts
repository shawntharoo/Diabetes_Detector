import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PatientData } from '../../../providers/patient-data';
import { Chart } from 'chart.js';

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
  HBA1Chistory : any;

  //FBS Report variables
  fbsCount: any = [];
  ppbsCount: any = [];
  FBSchartLabels: any = [];
  FBShistory: any;

  //Serum Creatine Report variables
  serCreCount : any = [];
  seruricAcidCount : any = [];
  SerCreatineChartVariables: any = [];
  SerCreatineHistory: any;

  patientData: any;

  firstReport: any = {};

  constructor(public navCtrl: NavController, private navParams: NavParams, private patientDta: PatientData) {
    this.patientData = navParams.get('patient');
    let patient = this.patientData;


    this.patientDta.patientHBA1CReport(patient.key).valueChanges().subscribe(HBA1Chistory => {
      for (var i = 0; i < HBA1Chistory.length; i++) {
        this.hba1cCount.push(HBA1Chistory[i]['hb1ac']);
        this.HBA1CchartLabels.push(HBA1Chistory[i]['date']);
      }
      this.HBA1Chistory = Object.assign([], HBA1Chistory);
      if (this.HBA1Chistory.length != 0) {
        this.firstReport.HBA1C = this.HBA1Chistory.slice(0, 1);
        this.HBA1Chistory.splice(0, 1);
      }
    })

    this.patientDta.patientFBSReport(patient.key).valueChanges().subscribe(FBShistory => {
      for (var i = 0; i < FBShistory.length; i++) {
        this.fbsCount.push(FBShistory[i]['fbs']);
        this.ppbsCount.push(FBShistory[i]['ppbs']);
        this.FBSchartLabels.push(FBShistory[i]['date']);
      }
      this.FBShistory = Object.assign([], FBShistory);
      if (this.FBShistory.length != 0) {
        this.firstReport.FBS = this.FBShistory.slice(0, 1);
        this.FBShistory.splice(0, 1);
      }
    })

    this.patientDta.patientSeCrReport(patient.key).valueChanges().subscribe(SerCreatineHistory => {
      for (var i = 0; i < SerCreatineHistory.length; i++) {
        this.serCreCount.push(SerCreatineHistory[i]['serCret']);
        this.seruricAcidCount.push(SerCreatineHistory[i]['serUricAcid']);
        this.SerCreatineChartVariables.push(SerCreatineHistory[i]['date']);
      }
      this.SerCreatineHistory = Object.assign([], SerCreatineHistory);
      if (this.SerCreatineHistory.length != 0) {
        this.firstReport.SerCreatine = this.SerCreatineHistory.slice(0, 1);
        this.SerCreatineHistory.splice(0, 1);
      }
    })

  }

  ionViewDidLoad() {
    this.FBSlineChart = new Chart(this.FBSlineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: this.FBSchartLabels,
        datasets: [
          {
            label: "My First dataset",
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
            label: "My First dataset",
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

    this.HBA1ClineChart = new Chart(this.HBA1ClineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: this.HBA1CchartLabels,
        datasets: [
          {
            label: "My First dataset",
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

    this.SeCrlineChart = new Chart(this.SeCrlineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: this.SerCreatineChartVariables,
        datasets: [
          {
            label: "My First dataset",
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
            label: "My First dataset",
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

  }

}
