import { Injectable } from "@angular/core";
import * as firebase from "firebase/app";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { Item } from "ionic-angular";
import { AngularFireAuth } from "angularfire2/auth";
import { HttpClient } from "@angular/common/http";
import { resolveDefinition } from "../../node_modules/@angular/core/src/view/util";
import { ConstantsProvider } from "./constants/constants";
import { DatePipe } from "@angular/common";
import { Observable } from "rxjs";

@Injectable()
export class PatientData {
  user: any;
  constructor(
    public db: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    public http: HttpClient,
    private datePipe: DatePipe
  ) {
    this.afAuth.authState.subscribe(user => {
      this.user = user;
    });
  }

  loadAllDoctors() {
    return this.db.list<Item>("DoctorProfiles");
  }

  logginPatient(email) {
    let transformedEmail = this.transform(email);
    return this.db.object("/UserProfiles/" + transformedEmail);
  }

  transform(email) {
    return email.replace(/\./g, ",");
  }

  retransform(email) {
    return email.replace(/\,/g, ".");
  }

  initialPatientData(
    firstname: String,
    lastname: String,
    doctor: String,
    age: String
  ) {
    var emailt = this.transform(this.user.email);
    return this.db.list("UserProfiles").set(emailt, {
      firstname: firstname,
      lastname: lastname,
      age: age,
      doctor: doctor,
      status: 1,
      email: this.user.email
    });
  }

  patientHBA1CReport(patinetEmail) {
    return this.db.list("PatientReports/" + patinetEmail + "/report1");
  }

  patientFBSReport(patinetEmail) {
    return this.db.list("PatientReports/" + patinetEmail + "/report2");
  }

  patientSeCrReport(patinetEmail) {
    return this.db.list("PatientReports/" + patinetEmail + "/report3");
  }
  setPatientReport(
    reportType,
    value,
    user,
    reportName,
    symptoms,
    date,
    byteArray?,
    extraparams?
  ) {
    console.log(JSON.stringify(extraparams))
    console.log(user);
    let userEmail = this.transform(user);
    let ref = this.db.list("PatientReports/" + userEmail + "/" + reportType).push({});
    if (byteArray) {
      // this.db
      //   .list("PatientReports/" + userEmail + "/" + reportType)
      //   .push({
      //     date: date,
      //     [reportName]: value,
      //     img: byteArray,
      //     symptoms: symptoms,
      //     status: "new",
      //     id: pushId
      //   })
      ref.set({
        date: date,
        [reportName]: parseInt(value,10),
        img: byteArray,
        symptoms: symptoms,
        status: "new",
        id: ref.key,
        ppbs: 0,
        serUricAcid:0
      })
    } else {
      ref.set({
        date: date,
        [reportName]: parseInt(value,10),
        symptoms: symptoms,
        status: "new",
        id: ref.key,
        ppbs: 0,
        serUricAcid:0
      });
    }
  }
  patientOCRFullReportFBS(reportData, user) {
    var patientEmail = this.transform(user);
    this.db.list("PatientReports/" + patientEmail + "/report3").push({
      date: "25/06/2018",
      blurea: 24.5,
      serAnalyze: 85,
      serCret: 0.85,
      serUricAcid: 4.5,
      fullReport: reportData
    });
  }

  patientPredictionReport() {
    return this.db.list("historyData");
  }

  patientPrescription(presKey) {
    return this.db.list("prescriptions/" + presKey);
  }

  patientPredictedValue(hsitory) {
    return new Promise((resolve, reject) => {
      this.http.post(ConstantsProvider.URL_PREDICTION, hsitory).subscribe(
        data => {
          resolve(data);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  lifestyleSuggesions() {
    return this.db.list("LifeStyles");
  }
  getAllSymptoms() {
    return new Promise((resolve, reject) => {
      this.http.get(ConstantsProvider.URL_LIST_SYMPTOMS, {}).subscribe(
        data => {
          resolve(data);
        },
        err => {
          reject(err);
        }
      );
    });
  }
  patientGetAllReports(user, type, status?) {
    let email = this.transform(user);
    console.log(email);
    let itemsRef: AngularFireList<any>;
    let items: Observable<any[]>;
    if (status) {
      return this.db.list<Item>("PatientReports/" + email + "/" + type, ref =>
        ref.orderByChild("status").equalTo(status)
      );
    } else {
      return this.db.list<Item>("PatientReports/" + email + "/" + type, ref =>
        ref.orderByChild("date")
      );
    }
  }
}
