import { Component } from '@angular/core';
import {  NavController, NavParams, LoadingController,
    AlertController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { EmailValidator } from '../../../validators/email';
import { ResetPassword } from '../../reset-password/reset-password';
import { PatientSignup } from '../patient-signup/patient-signup';
import { AuthData } from '../../../providers/auth-data';
import { PatientData } from '../../../providers/patient-data';
import { PatientTabsPage } from '../patient-tabs/patient-tabs';
import { IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-patientlogin',
    templateUrl: 'patient-login.html',
})
export class PatientLoginPage {
    public loginForm;
    loading: any;

    constructor(public navCtrl: NavController, public navParams: NavParams
        , public formBuilder: FormBuilder,
        public alertCtrl: AlertController, public loadingCtrl: LoadingController, public nav: NavController,
        public authData: AuthData, public patientData: PatientData) {

        this.loginForm = formBuilder.group({
            email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
            password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
        });

    }

    loginUser(): void {
        if (!this.loginForm.valid) {
            console.log(this.loginForm.value);
        } else {
            this.authData.signInWithEmail(this.loginForm.value).then(authData => {
                this.loading.dismiss().then(() => {
                    this.patientData.logginPatient(this.loginForm.value.email).valueChanges().subscribe(item => {
                        if(item != null){
                            this.nav.setRoot(PatientTabsPage);
                        }
                      });
                });
            }, error => {
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

    loginWithGoogle() {
        this.authData.signInWithGoogle()
          .then(
            () => this.navCtrl.setRoot(PatientTabsPage),
            error => console.log(error.message)
          );
      }

    goToSignup(): void {
        this.nav.push(PatientSignup);
    }

    goToResetPassword(): void {
        this.nav.push(ResetPassword);
    }

    loginWithFacebook(): void {
        this.authData.signInWithFacebook()
            .then(
                () => this.navCtrl.setRoot(PatientTabsPage),
                error => console.log(error.message)
            )
    }
}
