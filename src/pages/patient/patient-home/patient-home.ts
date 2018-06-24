import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { AuthData } from '../../../providers/auth-data';
import { DoctorData } from '../../../providers/doctor-data';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable, base64 } from '@firebase/util';
import { ModalController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { GoogleCloudVisionServiceProvider } from '../../../providers/google-cloud-vision-service';
@Component({
  selector: 'page-patienthome',
  templateUrl: 'patient-home.html'
})
export class PatientHomePage {
  visionres: string
  items: any[]
  base64Image:any;
  showCard:boolean = false;
  constructor(public navCtrl: NavController, public actionSheetCtrl: ActionSheetController, public authData: AuthData, public doctorData: DoctorData, public modalCtrl: ModalController, private camera: Camera,
    private vision: GoogleCloudVisionServiceProvider, ) {

  }
let
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
        this.base64Image = 'data:image/jpeg;base64,' + imageData;
        this.visionres = result.json().responses[0].textAnnotations[0].description
        this.showCard = true;
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
