import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-iagree',
  templateUrl: 'iagree.html'
})
export class IAgreePage {
  type: any;
  constructor(public navCtrl: NavController, public params: NavParams, public viewCtrl: ViewController) {

    this.type = params.get('type');
  }

  close(state){
    if(state == 'agree'){
      let data = { agree : 'agree' }
      this.viewCtrl.dismiss(data);
    }else if(state == 'dis'){
      let data = { agree : 'dis' }
      this.viewCtrl.dismiss(data);
    }
  }

}
