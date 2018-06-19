import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PatientData } from '../../../providers/patient-data';
import { Chart } from 'chart.js';

@Component({
  selector: 'page-patienthistory',
  templateUrl: 'patienthistory.html'
})

export class PatientHistoryPage {
history : any;
firstReport : any;
@ViewChild('FBSlineCanvas') FBSlineCanvas;
@ViewChild('HBA1ClineCanvas') HBA1ClineCanvas;
@ViewChild('SeCrlineCanvas') SeCrlineCanvas;
FBSlineChart: any;
HBA1ClineChart: any;
SeCrlineChart: any;
fbsCount : any = [];
ppbsCount: any = [];
chartLabels : any = [];

  constructor(public navCtrl: NavController, private navParams: NavParams, private patientDta: PatientData) {
    let patient = navParams.get('patient');
    this.patientDta.patientHistory(patient.key).valueChanges().subscribe(history => {
      for(var i=0; i<history.length; i++){
        this.fbsCount.push();
        this.ppbsCount.push();
        this.chartLabels.push();
      }
      this.history = Object.assign([], history);
      if(this.history.length != 0){
        this.firstReport = this.history.slice(0,1);
        this.history.splice(0, 1);
      }
    })
  }

  ionViewDidLoad() {
    this.FBSlineChart = new Chart(this.FBSlineCanvas.nativeElement, {
      type: 'line',
      data: {
          labels: ["January", "February", "March", "April", "May", "June", "July"],
          datasets: [
              {
                  label: "My First dataset",
                  fill: false,
                  lineTension: 0.1,
                  backgroundColor: "rgba(125,100,100,18)",
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
                  data: [65, 59, 80, 81, 56, 55, 40],
                  spanGaps: false,
              },
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
                data: [60, 50, 90, 50, 80, 100, 40],
                spanGaps: false,
            }
          ]
      }
  });

  this.HBA1ClineChart = new Chart(this.HBA1ClineCanvas.nativeElement, {
    type: 'line',
    data: {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
            {
                label: "My First dataset",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(125,100,100,18)",
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
                data: [65, 59, 80, 81, 56, 55, 40],
                spanGaps: false,
            }
        ]
    }
});

this.SeCrlineChart = new Chart(this.SeCrlineCanvas.nativeElement, {
  type: 'line',
  data: {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
          {
              label: "My First dataset",
              fill: false,
              lineTension: 0.1,
              backgroundColor: "rgba(125,100,100,18)",
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
              data: [65, 59, 80, 81, 56, 55, 40],
              spanGaps: false,
          },
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
            data: [60, 50, 90, 50, 80, 100, 40],
            spanGaps: false,
        }
      ]
  }
});

  }

}
