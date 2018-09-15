import { Component } from '@angular/core';
import {
    IonicPage, NavController, LoadingController,
    AlertController,ModalController
} from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthData } from '../../../providers/auth-data';
import { PatientData } from '../../../providers/patient-data';
import { EmailValidator } from '../../../validators/email';
import { PatientPaymentPage } from '../patient-payment/patient-payment';
import { IAgreePage } from '../../common/IAgree/iagree';


/**
 * Generated class for the Signup page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
    selector: 'page-patientinitialdata',
    templateUrl: 'patient-initialData.html',
})
export class PatientInitialData {

    public InitialDataForm;
    loading: any;
    doctors: any[]

    constructor(public nav: NavController, public authData: AuthData,
        public formBuilder: FormBuilder, public loadingCtrl: LoadingController,
        public alertCtrl: AlertController, public patientData: PatientData, public modalCtrl: ModalController) {

        this.patientData.loadAllDoctors().valueChanges().subscribe(doctor => this.doctors = doctor)

        this.InitialDataForm = formBuilder.group({
            firstname: ['', Validators.compose([Validators.required])],
            lastname: ['', Validators.compose([Validators.required])],
            age: ['', Validators.compose([Validators.required])],
            doctor: ['', Validators.compose([Validators.required])],
        })
    }

    /**
     * If the form is valid it will call the AuthData service to sign the user up password displaying a loading
     *  component while the user waits.
     *
     * If the form is invalid it will just log the form value.
     */
    initialData() {
        if (!this.InitialDataForm.valid) {
            console.log(this.InitialDataForm.value);
        } else {

            let profileModal = this.modalCtrl.create(IAgreePage, { type: 'patient' });
            profileModal.onDidDismiss(data => {
                console.log(data)
              if(data.agree == 'agree'){

                this.patientData.initialPatientData(this.InitialDataForm.value.firstname, this.InitialDataForm.value.lastname, this.InitialDataForm.value.doctor, this.InitialDataForm.value.age)
                .then(() => {
                    this.loading.dismiss().then(() => {
                        this.nav.setRoot(PatientPaymentPage);
                    });
                }, (error) => {
                    this.loading.dismiss().then(() => {
                        let alert = this.alertCtrl.create({
                            message: error.message,
                            buttons: [
                                {
                                    text: "Ok",
                                    role: 'cancel'
                                }
                            ]
                        });
                        alert.present();
                    });
                });
            this.loading = this.loadingCtrl.create();
            this.loading.present();
              }
            });
            profileModal.present();







        }
    }

}
