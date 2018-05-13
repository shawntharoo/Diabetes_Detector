import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { IonicPage } from 'ionic-angular';
import { DoctorData } from '../../../providers/doctor-data';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from '@firebase/util';
import { ModalController } from 'ionic-angular';
import { DoctorPatientHistoryPage } from '../doctor-patienthistory/doctor-patienthistory';
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-doctor-history',
  templateUrl: 'doctor-history.html'
})
export class DoctorHistoryPage {
  items: any[]
  constructor(public navCtrl: NavController, public doctorData: DoctorData, public modalCtrl: ModalController, public afAuth: AngularFireAuth) {
    afAuth.authState.subscribe(user => {
      this.doctorData.patientList(user).valueChanges().subscribe(item => {
        this.items = item
      });
    });
  }

  itemSelected(item) {
    let modal = this.modalCtrl.create(DoctorPatientHistoryPage, { patient: item});
    modal.present();
  }

}
