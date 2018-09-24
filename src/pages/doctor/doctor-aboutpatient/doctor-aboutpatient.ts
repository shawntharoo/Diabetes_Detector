import { Component } from "@angular/core";
import { NavController, NavParams, ModalController } from "ionic-angular";
import { AngularFireAuth } from "angularfire2/auth";
import { PatientData } from "../../../providers/patient-data";
import { DoctorViewReportPage } from '../../doctor-view-report/doctor-view-report';
@Component({
  selector: "page-doctoraboutpatient",
  templateUrl: "doctor-aboutpatient.html"
})
export class DoctorAboutPatientPage {
  patient: any;
  hba1cReports: any;
  fbsReports: any;
  scReports: any;
  noReports: boolean = false;
  constructor(
    public navCtrl: NavController,
    public modalCtrl:ModalController,
    public params: NavParams,
    private afAuth: AngularFireAuth,
    private patientData: PatientData
  ) {
    this.patient = params.get("patient");
    console.log(this.patient);
    this.getAllReports(this.patient.email)
  }
  getAllReports(email) {
    this.patientData
      .patientGetAllReports(email, "report1","new")
      .valueChanges()
      .subscribe(reports => {
        this.hba1cReports = reports;
        // if(reports.length>0){
        //   this.noReports = false
        // }
        console.log(this.hba1cReports);
      });
    this.patientData
      .patientGetAllReports(email, "report2","new")
      .valueChanges()
      .subscribe(reports => {
        this.fbsReports = reports;
        // if(reports.length>0){
        //   this.noReports = false
        // }
      });
    this.patientData
      .patientGetAllReports(email, "report3","new")
      .valueChanges()
      .subscribe(reports => {
        this.scReports = reports;
        // if(reports.length>0){
        //   this.noReports = true
        // }
      });
  }
  viewReport(data){
    let modal = this.modalCtrl.create(DoctorViewReportPage,{data:data,email:this.patient.email});
    modal.present();
  }
}
