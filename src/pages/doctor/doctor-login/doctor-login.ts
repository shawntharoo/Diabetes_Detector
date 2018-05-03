import { Component } from '@angular/core';
import {  NavController, NavParams, LoadingController,
    AlertController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { EmailValidator } from '../../../validators/email';
import { ResetPassword } from '../../reset-password/reset-password';
import { DoctorSignup } from '../doctor-signup/doctor-signup';
import { AuthData } from '../../../providers/auth-data';
import { DoctorData } from '../../../providers/doctor-data';
import { DoctorTabsPage } from '../doctor-tabs/doctor-tabs';

@Component({
    selector: 'page-doctorlogin',
    templateUrl: 'doctor-login.html',
})
export class DoctorLoginPage {
    public loginForm;
    loading: any;

    constructor(public navCtrl: NavController, public navParams: NavParams
        , public formBuilder: FormBuilder,
        public alertCtrl: AlertController, public loadingCtrl: LoadingController, public nav: NavController,
        public authData: AuthData, public doctorData: DoctorData) {

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
                    this.doctorData.logginDoctor(this.loginForm.value.email).valueChanges().subscribe(item => {
                        if(item != null){
                            this.nav.setRoot(DoctorTabsPage);
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

    goToSignup(): void {
        this.nav.push(DoctorSignup);
    }

    goToResetPassword(): void {
        this.nav.push(ResetPassword);
    }

}
