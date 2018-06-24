import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireDatabase } from 'angularfire2/database';
import { Item } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class PatientData {
  user: any;
  constructor(public db: AngularFireDatabase, public afAuth: AngularFireAuth) {
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

  patientOCRFullReportFBS(reportData, user){;
    var patientEmail = this.transform(user)
    this.db.list('PatientReports/'+ patientEmail + '/report2').push({
      date: "25/06/2018",
      fbs: 120,
      ogit: 0,
      ppbs: 125,
      rbs: 0,
      fullReport : reportData
    })
  }

}