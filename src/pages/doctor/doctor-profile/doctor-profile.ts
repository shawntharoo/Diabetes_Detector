import { Component } from '@angular/core';
import { DoctorData } from '../../../providers/doctor-data';
import { ModalController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
@Component({
  selector: 'page-doctorprofile',
  templateUrl: 'doctor-profile.html'
})
export class DoctorProfilePage {
patient : any;
  constructor(public modalCtrl: ModalController, public doctorData: DoctorData, public afAuth: AngularFireAuth ) {
    afAuth.authState.subscribe(user => {
      if (!user) {

      } else {
        // this.patientData.logginPatient(user.email).valueChanges().subscribe((patient) => {
        //   this.patient = patient;
        // })
      }
    });
  }

}
