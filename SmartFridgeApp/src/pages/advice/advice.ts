import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FacialEmotionPage } from '../facial-emotion/facial-emotion';
import { EmotionRecommendationPage } from '../emotion-recommendation/emotion-recommendation';
import { AddFridgeItemPage } from '../add-fridge-item/add-fridge-item';
import { RecipeServiceProvider } from '../../providers/recipe-service/recipe-service';
import { EmotionNutrientRestServiceProvider } from '../../providers/emotion-nutrient-rest-service/emotion-nutrient-rest-service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';

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
  user: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public recipeService: RecipeServiceProvider,
    public emotionNutrientRestService: EmotionNutrientRestServiceProvider, public angularFireAuth: AngularFireAuth,
    public firestore: AngularFirestore) {
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

  sad(event){
    this.navCtrl.push(EmotionRecommendationPage, {
      emotion: "Sad"
    });
  }

  angry(event){
    this.navCtrl.push(EmotionRecommendationPage, {
      emotion: "Angry"
    });
  }

  disgusted(event){
    this.navCtrl.push(EmotionRecommendationPage, {
      emotion: "Disgusted"
    });
  }

  scared(event){
    this.navCtrl.push(EmotionRecommendationPage, {
      emotion: "Scared"
    });
  }

  stressed(event){
    this.navCtrl.push(EmotionRecommendationPage, {
      emotion: "Stressed"
    });
  }

  bored(event){
    this.navCtrl.push(EmotionRecommendationPage, {
      emotion: "Bored"
    });
  }

  distressed(event){
    this.navCtrl.push(EmotionRecommendationPage, {
      emotion: "Distressed"
    });
  }

  addNewFridgeItem(){
    this.navCtrl.push(AddFridgeItemPage, {});
  }

  takeFoodOutOfFridge(){

  }

}
