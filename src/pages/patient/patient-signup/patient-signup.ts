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
    selector: 'page-patientsignup',
    templateUrl: 'patient-signup.html',
})
export class PatientSignup {

    public signupForm;
    loading: any;

    constructor(public nav: NavController, public authData: AuthData,
        public formBuilder: FormBuilder, public loadingCtrl: LoadingController,
        public alertCtrl: AlertController, public patientData: PatientData, ) {

        this.signupForm = formBuilder.group({
            email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
            password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
        })
    }

    /**
     * If the form is valid it will call the AuthData service to sign the user up password displaying a loading
     *  component while the user waits.
     *
     * If the form is invalid it will just log the form value.
     */
    signupUser() {
        if (!this.signupForm.valid) {
            console.log(this.signupForm.value);
        } else {
            this.authData.signupPatient(this.signupForm.value.email, this.signupForm.value.password)
                .then(() => {
                    this.loading.dismiss().then(() => {
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
