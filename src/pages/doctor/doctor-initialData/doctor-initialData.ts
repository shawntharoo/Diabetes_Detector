import { Component } from '@angular/core';
import {
    IonicPage, NavController, LoadingController,
    AlertController
} from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthData } from '../../../providers/auth-data';
import { DoctorData } from '../../../providers/doctor-data';
import { EmailValidator } from '../../../validators/email';
import { DoctorTabsPage } from '../doctor-tabs/doctor-tabs';


/**
 * Generated class for the Signup page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
    selector: 'page-doctorinitialdata',
    templateUrl: 'doctor-initialData.html',
})
export class DoctorInitialData {

    public InitialDataForm;
    loading: any;

    constructor(public nav: NavController, public authData: AuthData,
        public formBuilder: FormBuilder, public loadingCtrl: LoadingController,
        public alertCtrl: AlertController, public doctorData: DoctorData) {

        this.InitialDataForm = formBuilder.group({
            firstname: ['', Validators.compose([Validators.required])],
            lastname: ['', Validators.compose([Validators.required])],
            regno: ['', Validators.compose([Validators.required])],
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
            this.doctorData.initialDoctorData(this.InitialDataForm.value.firstname, this.InitialDataForm.value.lastname, this.InitialDataForm.value.regno)
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
