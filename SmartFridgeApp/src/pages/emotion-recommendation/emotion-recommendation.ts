import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the EmotionRecommendationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-emotion-recommendation',
  templateUrl: 'emotion-recommendation.html',
})
export class EmotionRecommendationPage {

  emotion: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.emotion=navParams.get('emotion')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmotionRecommendationPage');
  }

}
