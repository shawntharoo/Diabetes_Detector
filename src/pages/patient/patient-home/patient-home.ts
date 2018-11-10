import { GetTextFromReportProvider } from "./../../../providers/get-text-from-report/get-text-from-report";
import { Component } from "@angular/core";
import { NavController, AlertController, IonicPage } from "ionic-angular";
import { ActionSheetController } from "ionic-angular";
import { AuthData } from "../../../providers/auth-data";
import { DoctorData } from "../../../providers/doctor-data";
import { ModalController } from "ionic-angular";
import { Camera, CameraOptions } from "@ionic-native/camera";
import { PatientData } from "../../../providers/patient-data";
import { AngularFireAuth } from "angularfire2/auth";
import { SymptomsModalPage } from "../../symptoms-modal/symptoms-modal";

@IonicPage()
@Component({
  selector: "page-patienthome",
  templateUrl: "patient-home.html"
})
export class PatientHomePage {
  visionres: any;
  items: any[];
  base64Image: any;
  showCard: boolean = false;
  reportType: string = "";
  allReports: any = [];
  fbsReports:any;
  hba1cReports:any;
  scReports:any;
  constructor(
    public navCtrl: NavController,
    public actionSheetCtrl: ActionSheetController,
    public authData: AuthData,
    public doctorData: DoctorData,
    public modalCtrl: ModalController,
    private camera: Camera,
    public patientData: PatientData,
    public afAuth: AngularFireAuth,
    public getTxtFrmRep: GetTextFromReportProvider,
    public alertCtrl: AlertController
  ) {}
  ionViewDidEnter() {
    this.getAllReports();
  }
  callCam() {
    let alert = this.alertCtrl.create();
    alert.setTitle("Report Type");

    alert.addInput({
      type: "radio",
      label: "HBA1C",
      value: "hb1ac",
      checked: true
    });

    alert.addInput({
      type: "radio",
      label: "Serum Creatinine",
      value: "serCret"
    });

    alert.addInput({
      type: "radio",
      label: "FBS",
      value: "fbs"
    });
    alert.addButton({
      text: "Capture Report",
      handler: (data: any) => {
        console.log(data);
        this.reportType = data;
        switch (data) {
          case "hb1ac": {
            this.takePhoto('["HBA1C","GLYCOSYLATED","HEMOGLOBIN"]');
            break;
          }
          case "fbs": {
            this.takePhoto('["FASTING","BLOOD","GLUCOSE"]');
            break;
          }
          case "serCret": {
            this.takePhoto('["SERUM","CREATININE"]');
            break;
          }
        }
      }
    });
    alert.addButton("Cancel");
    alert.present();
  }
  takePhoto(searchTerms) {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      targetWidth: 780,
      targetHeight:1040,
      saveToPhotoAlbum: false,
      correctOrientation: true
      // quality: 100,
      // targetWidth:595,
      // targetHeight:842,
      // sourceType: this.camera.PictureSourceType.CAMERA,
      // //destinationType: this.camera.DestinationType.DATA_URL,
      // encodingType: this.camera.EncodingType.JPEG,
    };
    this.camera.getPicture(options).then(
      imageData => {
        // this.alertError(imageData);
        this.getTxtFrmRep
          .getText(imageData, JSON.parse(searchTerms))
          .then(response => {
            let res: any = response;
            //this.alertError(JSON.stringify(response));
            this.showSymptomsModal(
              this.reportType,
              res.extracted_value,
              imageData
            );
          })
          .catch(error => {
            //this.alertError(JSON.stringify(error));
            this.alertInputReportVal(imageData);
          });
      },
      err => {
        //this.alertError(JSON.stringify(err));
        this.alertInputReportVal();
      }
    );
  }

  logout() {
    let actionSheet = this.actionSheetCtrl.create({
      title: "Modify your album",
      buttons: [
        {
          text: "Logout",
          role: "logout",
          handler: () => {
            this.authData.logoutUser();
            console.log("Logout clicked");
          }
        },
        {
          text: "Cancel",
          role: "cancel",
          handler: () => {
            console.log("Cancel clicked");
          }
        }
      ]
    });
    actionSheet.present();
  }
  getReportNumber(reportType) {
    switch (reportType) {
      case "hba1c": {
        return "report1";
      }
      case "fbs": {
        return "report2";
      }
      case "serCret": {
        return "report3";
      }
    }
  }
  showSymptomsModal(reportType, reportVal, imgData?) {
    const params = {
      reportType: reportType,
      reportVal: reportVal,
      imgData: imgData
    };
    let symptomsModal = this.modalCtrl.create(SymptomsModalPage, {
      data: params
    });
    symptomsModal.present();
  }
  alertError(error) {
    let alert = this.alertCtrl.create();
    alert.setTitle("Error uploading image");
    alert.setMessage(error);
    alert.addButton({
      text: "Ok",
      role: "cancel"
    });
    alert.present();
  }
  alertInputReportVal(imgData?) {
    let alert = this.alertCtrl.create();
    alert.setTitle("Error getting report value");

    alert.addInput({
      name: "reportVal",
      placeholder: "Report Value"
    });
    alert.addButton({
      text: "Cancel",
      role: "cancel"
    });
    alert.addButton({
      text: "Submit",
      handler: data => {
        if (imgData) {
          this.showSymptomsModal(this.reportType, data.reportVal, imgData);
        } else {
          this.showSymptomsModal(this.reportType, data.reportVal);
        }

        // alert.dismiss();
      }
    });
    alert.present();
  }
  getAllReports() {
    this.afAuth.authState.subscribe(user => {
      this.patientData
        .patientGetAllReports(user.email, "report1")
        .valueChanges()
        .subscribe(reports => {
         this.hba1cReports = reports;
          console.log(this.hba1cReports);
        });
      this.patientData
        .patientGetAllReports(user.email, "report2")
        .valueChanges()
        .subscribe(reports => {
          this.fbsReports = reports;
        });
      this.patientData
        .patientGetAllReports(user.email, "report3")
        .valueChanges()
        .subscribe(reports => {
          this.scReports = reports;
        });
    });
  }
}
