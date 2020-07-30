import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FacialEmotionPage } from '../facial-emotion/facial-emotion';
import { EmotionRecommendationPage } from '../emotion-recommendation/emotion-recommendation';

/**
 * Generated class for the AdvicePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-advice',
  templateUrl: 'advice.html',
})
export class AdvicePage {

  title: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.title="Advice"
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdvicePage');
  }

  launchFacialEmotionRecognition (event){
    this.navCtrl.push(FacialEmotionPage, {});
  }

  happy(event){
    this.navCtrl.push(EmotionRecommendationPage, {
      emotion: "Happy"
    });
  }

}
