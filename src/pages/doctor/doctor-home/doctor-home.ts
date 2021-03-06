import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { AuthData } from '../../../providers/auth-data';
import { DoctorData } from '../../../providers/doctor-data';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from '@firebase/util';
import { ModalController } from 'ionic-angular';
import { DoctorAboutPatientPage } from '../doctor-aboutpatient/doctor-aboutpatient';
import { IonicPage } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-doctorhome',
  templateUrl: 'doctor-home.html'
})
export class DoctorHomePage {
  items: any[]

  constructor(public navCtrl: NavController, public actionSheetCtrl: ActionSheetController, public authData: AuthData , public doctorData: DoctorData, public modalCtrl: ModalController, public afAuth: AngularFireAuth) {
    afAuth.authState.subscribe(user => {
    this.doctorData.patientNotification(user).valueChanges().subscribe(item => {
      this.items = item
      console.log(this.items)
    });
  });
  }

  logout() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Modify your album',
      buttons: [
        {
          text: 'Logout',
          role: 'logout',
          handler: () => {
            this.authData.logoutUser();
            console.log('Logout clicked');
          }
        }, {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  itemSelected(item) {
    let modal = this.modalCtrl.create(DoctorAboutPatientPage, { patient: item});
    modal.present();
  }

}
