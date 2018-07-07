import { Component } from '@angular/core';
import { ModalController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { FormBuilder, Validators } from '@angular/forms';
import { DoctorData } from '../../../../providers/doctor-data';
@Component({
  selector: 'page-editdoctorprofile',
  templateUrl: 'edit-doctor-profile.html'
})
export class EditDoctorProfilePage {
  public InitialDataForm;
  doctor: any;

  constructor(public modalCtrl: ModalController,public params: NavParams, public doctorData: DoctorData, public afAuth: AngularFireAuth, public formBuilder: FormBuilder,public viewCtrl: ViewController, private alertCtrl: AlertController) {
    this.InitialDataForm = formBuilder.group({
      firstname: ['', Validators.compose([Validators.required])],
      lastname: ['', Validators.compose([Validators.required])],
      regno: ['', Validators.compose([Validators.required])],
  })

    this.doctor = params.get('doctorData'); 
    this.InitialDataForm.controls['firstname'].setValue(this.doctor.firstname)
    this.InitialDataForm.controls['lastname'].setValue(this.doctor.lastname)
    this.InitialDataForm.controls['regno'].setValue(this.doctor.reg_no)
  }

  editProfile(){
    console.log(this.InitialDataForm.value);
    this.doctorData.initialDoctorData(this.InitialDataForm.value.firstname, this.InitialDataForm.value.lastname, this.InitialDataForm.value.regno)
    .then((data) => {
        this.viewCtrl.dismiss(data);
    }, (error) => {
        let alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: 'Error in updating profile',
            buttons: ['Dismiss']
          });
          alert.present();
    });
  }

}
