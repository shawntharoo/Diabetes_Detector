import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireDatabase } from 'angularfire2/database';
import { Item } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class DoctorData {
user : any;
  constructor(public db: AngularFireDatabase, public afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      this.user = user;
    });
  }

  patientNotification(user){
    return this.db.list<Item>('UserProfiles', ref => ref.orderByChild('doctor').equalTo(user.email));
  }

  patientList(user) {
    return this.db.list<Item>('UserProfiles', ref => ref.orderByChild('doctor').equalTo(user.email));
  }

  logginDoctor(email) {
    let transformedEmail = this.transform(email);
    return this.db.object('/DoctorProfiles/' + transformedEmail);
  }
  
  transform(email) {
    return email.replace(/\./g, ',');
  }

  initialDoctorData(firstname: String, lastname: String, regno: String){
     var emailt = this.transform(this.user.email);
     return this.db.list('DoctorProfiles').set(emailt, {
        firstname: firstname,
        lastname: lastname,
        reg_no: regno,
        status: 1
      })
  }

}