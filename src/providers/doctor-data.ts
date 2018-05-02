import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireDatabase } from 'angularfire2/database';
import { Item } from 'ionic-angular';

@Injectable()
export class DoctorData {

  constructor(public db: AngularFireDatabase) {

  }

  patientList() {
    return this.db.list<Item>('userProfile');
  }

  logginDoctor() {
    
  }

}