import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { AuthData } from '../../../providers/auth-data';
import { DoctorData } from '../../../providers/doctor-data';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from '@firebase/util';
import { ModalController } from 'ionic-angular';

@Component({
  selector: 'page-patienthome',
  templateUrl: 'patient-home.html'
})
export class PatientHomePage {
  items: any[]
  constructor(public navCtrl: NavController, public actionSheetCtrl: ActionSheetController, public authData: AuthData , public doctorData: DoctorData, public modalCtrl: ModalController) {
    this.doctorData.patientList().valueChanges().subscribe(item => {
      console.log(item)
      this.items = item
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

}
