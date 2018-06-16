import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { IonicPage } from 'ionic-angular';
import { DoctorData } from '../../../providers/doctor-data';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from '@firebase/util';
import { AngularFireAuth } from 'angularfire2/auth';
import { PatientHistoryPage } from '../../common/patienthistory/patienthistory';

@IonicPage()
@Component({
  selector: 'page-doctor-history',
  templateUrl: 'doctor-history.html'
})
export class DoctorHistoryPage {
  items= [];
  constructor(public navCtrl: NavController, public doctorData: DoctorData, public afAuth: AngularFireAuth) {
    afAuth.authState.subscribe(user => {
      this.doctorData.patientList(user).snapshotChanges().subscribe(actions => {
        actions.forEach(action => {
          var singleItem = action.payload.val();
          singleItem.key = action.key;
          this.items.push(singleItem);
        });
      });
    });
  }

  itemSelected(item) {
    this.navCtrl.push(PatientHistoryPage, {
      patient: item
    });
  }

}
