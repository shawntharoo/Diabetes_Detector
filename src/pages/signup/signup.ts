import { Component } from '@angular/core';
import {
    IonicPage, NavController, LoadingController,
    AlertController
} from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthData } from '../../providers/auth-data';
import { PatientData } from '../../providers/patient-data';
import { EmailValidator } from '../../validators/email';
import { DoctorTabsPage } from '../doctor/tabs/tabs';


/**
 * Generated class for the Signup page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
    selector: 'page-signup',
    templateUrl: 'signup.html',
})
export class Signup {

    public signupForm;
    loading: any;
    doctors: any[]
    regerror: boolean =false;
    docerror: boolean = false;

    constructor(public nav: NavController, public authData: AuthData,
        public formBuilder: FormBuilder, public loadingCtrl: LoadingController,
        public alertCtrl: AlertController, public patientData: PatientData, ) {

        this.patientData.loadAllDoctors().valueChanges().subscribe(doctor => this.doctors = doctor)

        this.signupForm = formBuilder.group({
            firstname: ['', Validators.compose([Validators.required])],
            lastname: ['', Validators.compose([Validators.required])],
            email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
            password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
            role: ['', Validators.compose([Validators.required])],
            regno: ['', Validators.compose([])],
            doctor: ['', Validators.compose([])],
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
            if (this.signupForm.value.regno == '' && this.signupForm.value.role == 'doctor') {
                this.docerror = false;
                this.regerror = true;
            }else if(this.signupForm.value.doctor == '' && this.signupForm.value.role == 'patient'){
                this.regerror = false;
                this.docerror = true;
            }
            else {
                this.regerror = false;
                this.docerror = false;
                this.authData.signupUser(this.signupForm.value.firstname, this.signupForm.value.lastname, this.signupForm.value.email, this.signupForm.value.password, this.signupForm.value.role, this.signupForm.value.regno, this.signupForm.value.doctor)
                    .then(() => {
                        this.loading.dismiss().then(() => {
                            this.nav.setRoot(DoctorTabsPage);
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

}
