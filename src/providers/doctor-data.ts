import { Injectable } from "@angular/core";
import * as firebase from "firebase/app";
import { AngularFireDatabase } from "angularfire2/database";
import { Item } from "ionic-angular";
import { AngularFireAuth } from "angularfire2/auth";
import { ConstantsProvider } from "./constants/constants";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class DoctorData {
  user: any;
  constructor(
    public db: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    private http: HttpClient
  ) {
    this.afAuth.authState.subscribe(user => {
      this.user = user;
    });
  }

  patientNotification(user) {
    return this.db.list<Item>("UserProfiles", ref =>
      ref.orderByChild("doctor").equalTo(user.email)
    );
  }

  patientList(user) {
    return this.db.list<Item>("UserProfiles", ref =>
      ref.orderByChild("doctor").equalTo(user.email)
    );
  }

  logginDoctor(email) {
    let transformedEmail = this.transform(email);
    return this.db.object("/DoctorProfiles/" + transformedEmail);
  }

  transform(email) {
    return email.replace(/\./g, ",");
  }

  initialDoctorData(firstname: String, lastname: String, regno: String) {
    var emailt = this.transform(this.user.email);
    return this.db.list("DoctorProfiles").set(emailt, {
      firstname: firstname,
      lastname: lastname,
      reg_no: regno,
      status: 1
    });
  }
  getComplication(symptoms) {
    return new Promise((resolve, reject) => {
      this.http
        .post(ConstantsProvider.URL_GET_COMPLICATION, symptoms)
        .subscribe(data => resolve(data), error => reject(error));
    });
  }
  getMedication(complication) {
    return new Promise((resolve, reject) => {
      this.http
        .post(ConstantsProvider.URL_GET_MEDICINE, {
          complication_name: complication
        })
        .subscribe(data => resolve(data), error => reject(error));
    });
  }
  updateReport(reportId,user,reportType,reportData){
    switch(reportType){
      case "hba1c":{
        this.db.list('PatientReports/'+this.transform(user)+"/report1/").update(reportId,reportData)
        break;
      }
      case "fbs":{
        this.db.list('PatientReports/'+this.transform(user)+"/report2/").update(reportId,reportData)
        break;
      }
      case "secr":{
        this.db.list('PatientReports/'+this.transform(user)+"/report3/").update(reportId,reportData)
        break;
      }
    }
    
  }
}
