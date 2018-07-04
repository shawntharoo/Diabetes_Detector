import { Component } from '@angular/core';
import { DoctorData } from '../../../providers/doctor-data';
import { ModalController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
@Component({
  selector: 'page-doctorprofile',
  templateUrl: 'doctor-profile.html'
})
export class DoctorProfilePage {
doctor : any;
  constructor(public modalCtrl: ModalController, public doctorData: DoctorData, public afAuth: AngularFireAuth ) {
    afAuth.authState.subscribe(user => {
      if (!user) {

      } else {
        this.doctorData.logginDoctor(user.email).valueChanges().subscribe((doctor) => {
          this.doctor = doctor;
        })
      }
    });
  }

}
