import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireDatabase } from 'angularfire2/database';
import { Item } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { HttpClient } from '@angular/common/http';
import { resolveDefinition } from '../../node_modules/@angular/core/src/view/util';
import { ConstantsProvider } from './constants/constants';

@Injectable()
export class PatientData {
  user: any;
  constructor(public db: AngularFireDatabase, public afAuth: AngularFireAuth, public http: HttpClient) {
    this.afAuth.authState.subscribe(user => {
      this.user = user;
    });
  }

  loadAllDoctors() {
    return this.db.list<Item>('DoctorProfiles');
  }

  logginPatient(email) {
    let transformedEmail = this.transform(email);
    return this.db.object('/UserProfiles/' + transformedEmail);

  }

  transform(email) {
    return email.replace(/\./g, ',');
  }

  retransform(email) {
    return email.replace(/\,/g, '.');
  }

  initialPatientData(firstname: String, lastname: String, doctor: String, age: String) {
    var emailt = this.transform(this.user.email);
    return this.db.list('UserProfiles').set(emailt, {
      firstname: firstname,
      lastname: lastname,
      age: age,
      doctor: doctor,
      status: 1
    })
  }

  patientHBA1CReport(patinetEmail) {
    return this.db.list('PatientReports/'+ patinetEmail + '/report1');
  }

  patientFBSReport(patinetEmail) {
    return this.db.list('PatientReports/'+ patinetEmail + '/report2');
  }

  patientSeCrReport(patinetEmail) {
    return this.db.list('PatientReports/'+ patinetEmail + '/report3');
  }

  patientOCRFullReportFBS(reportData, user){
    var patientEmail = this.transform(user)
    this.db.list('PatientReports/'+ patientEmail + '/report3').push({
      date: "25/06/2018",
      blurea: 24.5,
      serAnalyze: 85,
      serCret: 0.85,
      serUricAcid: 4.5,
      fullReport : reportData
    })
  }

  patientPredictionReport() {
    return this.db.list('historyData');
  }

  patientPrescription(presKey){
 return this.db.list('prescriptions/'+ presKey);
  }

  patientPredictedValue(hsitory){
    return new Promise((resolve,reject)=>{
      this.http.post(ConstantsProvider.URL_PREDICTION,hsitory)
        .subscribe(data=>{
          resolve(data)
        },
        err =>{
          reject(err)
        }
      )
    })
  }

  lifestyleSuggesions(){
    return this.db.list('LifeStyles');
  }

}