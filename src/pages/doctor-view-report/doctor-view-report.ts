import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DoctorData } from '../../providers/doctor-data';

/**
 * Generated class for the DoctorViewReportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-doctor-view-report',
  templateUrl: 'doctor-view-report.html',
})
export class DoctorViewReportPage {
  reportData:any;
  reportType:string;
  reportResult:string;
  compli:any;
  hasCompli:boolean=false;
  enterCompli:boolean=false;
  hasMedic:boolean=false;
  medication:any;
  customComplication:any;
  selectedMedication:any;
  patientEmail: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public doctorData:DoctorData) {
    this.reportData = navParams.get("data");
    this.patientEmail = navParams.get("email");
    Object.keys(this.reportData).forEach(el=>{
      if(el.indexOf("hb1ac")!=-1 || el.indexOf("fbs")!=-1 || el.indexOf("serCret")!=-1){
        this.reportType = el;
        this.reportResult = this.reportData[el]
      }
    })
    console.log(this.reportData)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DoctorViewReportPage');
  }
  getComplication(symptoms){
    this.doctorData.getComplication(symptoms).then(response=>{
      const tempRes:any = response
      this.compli = tempRes.complication;
      this.hasCompli = true;
    }).catch((error)=>{
      this.hasCompli = false;
      this.enterCompli = true;
    })
  }
  getMedicine(){
    if(this.compli){
      this.doctorData.getMedication(this.compli).then(res=>{
        this.medication = res;
        this.hasMedic = true;
      })
    }else{
      this.doctorData.getMedication(this.customComplication).then(res=>{
        this.medication = res;
        this.hasMedic = true;
      })
    }
    
  }
  saveReport(){
    let ReportData:any;
    if(this.compli){
      ReportData = {
        status:'done',
        complication:this.compli,
        medication:this.selectedMedication
      }
    }else{
      ReportData = {
        status:'done',
        complication:this.customComplication,
        medication:this.selectedMedication
      }
    }
   
    this.doctorData.updateReport(this.reportData.id,this.patientEmail,this.reportType,ReportData)
    this.navCtrl.pop();
  }
}
