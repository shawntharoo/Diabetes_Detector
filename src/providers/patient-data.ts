import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireDatabase } from 'angularfire2/database';
import { Item } from 'ionic-angular';

@Injectable()
export class PatientData {

  constructor(public db: AngularFireDatabase) {

  }

  loadAllDoctors(){
    return this.db.list<Item>('DoctorProfiles');
  }

  logginPatient(email) {
    let transformedEmail = this.transform(email);
    
  }

  
  transform(email) {
    return email.replace(/\./g, ',');
  }

}