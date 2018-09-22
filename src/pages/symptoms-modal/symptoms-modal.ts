import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, ViewController } from "ionic-angular";
import { PatientData } from "../../providers/patient-data";
import { AngularFireAuth } from "angularfire2/auth";

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
  public allSymptoms:any = [];
  public dataFromPrev;
  public selectedSymptoms = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private patientData: PatientData,
    private afAuth:AngularFireAuth,
    private viewCtrl:ViewController
  ) {
    this.dataFromPrev = navParams.get("data");
    console.log(navParams.get("data"));
  }

  ionViewDidLoad() {
    this.patientData.getAllSymptoms().then(res => {
      let response:any = res;
      this.allSymptoms = response.symptoms;
      console.log(res);
    });
    
  }
  submitData() {
    this.afAuth.authState.subscribe(user => {
      this.patientData.setPatientReport(
        this.getReportNumber(this.dataFromPrev.reportType),
        this.dataFromPrev.reportVal,
        user.email,
        this.dataFromPrev.reportType,
        this.selectedSymptoms
      )
    });
    this.viewCtrl.dismiss();
  }
  getReportNumber(reportType) {
    switch (reportType) {
      case "hba1c": {
        return "report1";
      }
      case "fbs": {
        return "report2";
      }
      case "secr": {
        return "report3";
      }
    }
  }
}
