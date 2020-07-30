import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the FridgePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-fridge',
  templateUrl: 'fridge.html',
})
export class FridgePage {

  title: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.title="Fridge"
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FridgePage');
  }

}
