import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { AuthData } from '../../providers/auth-data';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from '@firebase/util';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  constructor(public navCtrl: NavController, public actionSheetCtrl: ActionSheetController, public authData: AuthData) {
//  this.authData.databaseTest().snapshotChanges().map(changes => {
//    changes.map(c => {
//     console.log(c);
//     ({
//     val : c['payload'].key
//   })
// })
// })

this.authData.databaseTest().valueChanges().subscribe(item => console.log(item));
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
        },{
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
