import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController
} from "ionic-angular";
import { PatientData } from "../../providers/patient-data";
import { AngularFireAuth } from "angularfire2/auth";
import { DatePipe } from "@angular/common";

/**
 * Generated class for the SymptomsModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-symptoms-modal",
  templateUrl: "symptoms-modal.html"
})
export class SymptomsModalPage {
  public allSymptoms: any = [];
  public dataFromPrev;
  public selectedSymptoms = [];
  public imgReport: string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private patientData: PatientData,
    private afAuth: AngularFireAuth,
    private viewCtrl: ViewController,
    private datePipe: DatePipe
  ) {
    this.dataFromPrev = navParams.get("data");
    this.imgReport = "data:image/jpeg;base64," + this.dataFromPrev.imgData;
  }

  ionViewDidLoad() {
    this.patientData.getAllSymptoms().then(res => {
      let response: any = res;
      this.allSymptoms = response.symptoms;
      console.log(res);
    });
  }
  submitData() {
    console.log("extraparams --> "+JSON.stringify(this.getExtraParams(this.dataFromPrev.reportType)))
    this.afAuth.authState.subscribe(user => {
      this.patientData.setPatientReport(
        this.getReportNumber(this.dataFromPrev.reportType),
        this.dataFromPrev.reportVal,
        user.email,
        this.dataFromPrev.reportType,
        this.selectedSymptoms,
        this.dateGen(),
        this.dataFromPrev.imgData,
        this.getExtraParams(this.dataFromPrev.reportType)
      );
    });
    this.viewCtrl.dismiss();
  }
  getReportNumber(reportType) {
    switch (reportType) {
      case "hb1ac": {
        return "report1";
      }
      case "fbs": {
        return "report2";
      }
      case "serCret": {
        return "report3";
      }
    }
  }
  getExtraParams(reportType) {
    let extraParams: any;
    switch (reportType) {
      case "fbs": {
        extraParams = {
          ppbs: "0"
        };
        return extraParams;
      }
      case "serCret": {
        extraParams = {
          serUricAcid: "0"
        };
        return extraParams;
      }
      case "hb1ac":{
        extraParams = {
          params: "0"
        };
        return extraParams;
      }
    }
  }
  dateGen() {
    return this.datePipe.transform(new Date(), "MM/dd/yyyy");
  }
}
