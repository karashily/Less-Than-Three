import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the StatisticsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-statistics',
  templateUrl: 'statistics.html',
})
export class StatisticsPage {

  title: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.title="Statistics"
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StatisticsPage');
  }

}
