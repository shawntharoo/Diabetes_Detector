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


  patientHistory(patinetEmail) {
    return this.db.list('PatientReports/'+ patinetEmail);
  }

}