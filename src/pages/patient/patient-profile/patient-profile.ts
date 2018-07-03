import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { PatientData } from '../../../providers/patient-data';
import { AngularFireAuth } from 'angularfire2/auth';
@Component({
  selector: 'page-patientprofile',
  templateUrl: 'patient-profile.html'
})
export class PatientProfilePage {
patient : any;
  constructor(public modalCtrl: ModalController, public patientData: PatientData, public afAuth: AngularFireAuth ) {
    afAuth.authState.subscribe(user => {
      if (!user) {

      } else {
        this.patientData.logginPatient(user.email).valueChanges().subscribe((patient) => {
          this.patient = patient;
        })
      }
    });
  }

}
