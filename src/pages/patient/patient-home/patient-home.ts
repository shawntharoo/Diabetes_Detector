import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { AuthData } from '../../../providers/auth-data';
import { DoctorData } from '../../../providers/doctor-data';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from '@firebase/util';
import { ModalController } from 'ionic-angular';
<<<<<<< HEAD
import { Camera, CameraOptions } from '@ionic-native/camera';
import { GoogleCloudVisionServiceProvider } from '../../../providers/google-cloud-vision-service/google-cloud-vision-service';
=======
import { IonicPage } from 'ionic-angular';

@IonicPage()
>>>>>>> cf75488c7d8f6b8617e0040ff4e9b1ae91f7981c
@Component({
  selector: 'page-patienthome',
  templateUrl: 'patient-home.html'
})
export class PatientHomePage {
  visionres: string
  items: any[]
  constructor(public navCtrl: NavController, public actionSheetCtrl: ActionSheetController, public authData: AuthData, public doctorData: DoctorData, public modalCtrl: ModalController, private camera: Camera,
    private vision: GoogleCloudVisionServiceProvider, ) {

  }

  takePhoto() {
    const options: CameraOptions = {
      quality: 100,
      targetHeight: 500,
      targetWidth: 500,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      this.vision.getLabels(imageData).subscribe((result) => {
        console.log(result.json().responses[0].textAnnotations[0].description
        );
        this.visionres=result.json().responses[0].textAnnotations[0].description
      }, err => {
        console.log(err);
      });
    }, err => {
      console.log(err);
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
