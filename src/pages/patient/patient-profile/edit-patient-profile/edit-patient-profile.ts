import { Component } from '@angular/core';
import { ModalController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { PatientData } from '../../../../providers/patient-data';
import { AngularFireAuth } from 'angularfire2/auth';
import { FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'page-editpatientprofile',
  templateUrl: 'edit-patient-profile.html'
})
export class EditPatientProfilePage {
    public InitialDataForm;
patient : any;
doctors: any;

  constructor(public modalCtrl: ModalController,public params: NavParams, public patientData: PatientData, public afAuth: AngularFireAuth, public formBuilder: FormBuilder,public viewCtrl: ViewController, private alertCtrl: AlertController) {
    this.InitialDataForm = this.formBuilder.group({
        firstname: ['', Validators.compose([Validators.required])],
        lastname: ['', Validators.compose([Validators.required])],
        age: ['', Validators.compose([Validators.required])],
        doctor: ['', Validators.compose([Validators.required])],
    })

    this.patient = params.get('patientData'); 
    this.patientData.loadAllDoctors().valueChanges().subscribe(doctor => this.doctors = doctor);
    this.InitialDataForm.controls['firstname'].setValue(this.patient.firstname)
    this.InitialDataForm.controls['lastname'].setValue(this.patient.lastname)
    this.InitialDataForm.controls['age'].setValue(this.patient.age)
    this.InitialDataForm.controls['doctor'].setValue(this.patient.doctor)
  }

  editProfile(){
    console.log(this.InitialDataForm.value);
    this.patientData.initialPatientData(this.InitialDataForm.value.firstname, this.InitialDataForm.value.lastname, this.InitialDataForm.value.doctor, this.InitialDataForm.value.age)
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
