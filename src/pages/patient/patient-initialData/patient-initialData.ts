import { Component } from '@angular/core';
import {
    IonicPage, NavController, LoadingController,
    AlertController
} from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthData } from '../../../providers/auth-data';
import { PatientData } from '../../../providers/patient-data';
import { EmailValidator } from '../../../validators/email';
import { PatientTabsPage } from '../patient-tabs/patient-tabs';


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
        public alertCtrl: AlertController, public patientData: PatientData) {

        this.patientData.loadAllDoctors().valueChanges().subscribe(doctor => this.doctors = doctor)

        this.InitialDataForm = formBuilder.group({
            firstname: ['', Validators.compose([Validators.required])],
            lastname: ['', Validators.compose([Validators.required])],
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
            this.patientData.initialDoctorData(this.InitialDataForm.value.firstname, this.InitialDataForm.value.lastname, this.InitialDataForm.value.doctor)
                .then(() => {
                    this.loading.dismiss().then(() => {
                        this.nav.setRoot(PatientTabsPage);
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
    }

}
