import { GetTextFromReportProvider } from './../../../providers/get-text-from-report/get-text-from-report';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { AuthData } from '../../../providers/auth-data';
import { DoctorData } from '../../../providers/doctor-data';
import { ModalController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { PatientData } from '../../../providers/patient-data';
import { AngularFireAuth } from 'angularfire2/auth';

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
     public patientData: PatientData, public afAuth: AngularFireAuth, public getTxtFrmRep:GetTextFromReportProvider ) {

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
      // this.vision.getLabels(imageData).subscribe((result) => {
      //   this.base64Image = 'data:image/jpeg;base64,' + imageData;
      //   this.visionres = result.json().responses[0].textAnnotations[0].description;
      //   this.afAuth.authState.subscribe(user => {
      //     this.patientData.patientOCRFullReportFBS(this.visionres, user.email)
      //     this.showCard = true;
      //   })
      // }, err => {
      //   console.log(err);
      // });
      this.getTxtFrmRep.getText(imageData).then((response)=>{
        let res = response;
        this.visionres = res[0].fullTextAnnotation.text;
        this.showCard = true;
      }).catch((error)=>{
        console.error(error);
      })
    }, err => {
      console.error(err);
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
