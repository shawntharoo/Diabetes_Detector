import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { PatientTabsPage } from '../patient-tabs/patient-tabs';

@IonicPage()
@Component({
    selector: 'page-patientpayment',
    templateUrl: 'patient-payment.html',
})
export class PatientPaymentPage {

    constructor(public nav: NavController) {
    }

    loadHomePage(){
        this.nav.push(PatientTabsPage);
        this.nav.setRoot(PatientTabsPage);
        this.nav.popTo(PatientTabsPage)
    }
}
