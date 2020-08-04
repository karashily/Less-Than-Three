import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { foodNutritionData } from '../../data/foodNutritionData';

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

  emotionSpecificFoods: any=[];

  /*
  Happy: 0
  Sad: 1
  Angry: 2
  Disgusted: 3
  Scared: 4
  Stressed: 5
  Bored: 6
  Distressed: 7*/

  happyFoodIDs: any=["19905", "12155", "20137", "9037", "11090", "11976", "11477", "1256"];
  sadFoodIDs: any=["19905", "12155", "20137", "9037", "11090", "11976", "11477", "1256"];
  stressedFoodIDs: any=["11457", "11233", "12085", "1123", "9200"];
  distressedFoodIDs: any=["11457", "11233", "12085", "1123", "9200"];
  scaredFoodIDs: any=["11457", "11233", "12085", "1123", "9200"];
  boredFoodIDs: any=["1116", "9040", "20036", "11507", "11080"];
  angryFoodIDs: any=["9316", "12220", "12155","12695","12037"];
  disgustedFoodIDs: any=["9316", "12220", "12155","12695","12037"];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.emotion=navParams.get('emotion')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmotionRecommendationPage');
    if(this.emotion=="Happy"){
      for(let happyFoodID of this.happyFoodIDs){
        var result = foodNutritionData.foodData.filter(obj => {
          return obj.Ingredient_Code === happyFoodID
        })[0];
       
        this.emotionSpecificFoods.push(result);
      }
    } else if(this.emotion=="Sad"){
      for(let sadFoodID of this.sadFoodIDs){
        var result = foodNutritionData.foodData.filter(obj => {
          return obj.Ingredient_Code === sadFoodID
        })[0];
        this.emotionSpecificFoods.push(result);
      }
    } else if(this.emotion=="Angry"){
      for(let happyFoodID of this.angryFoodIDs){
        var result = foodNutritionData.foodData.filter(obj => {
          return obj.Ingredient_Code === happyFoodID
        })[0];
        this.emotionSpecificFoods.push(result);
      }
    } else if(this.emotion=="Disgusted"){
      for(let happyFoodID of this.disgustedFoodIDs){
        var result = foodNutritionData.foodData.filter(obj => {
          return obj.Ingredient_Code === happyFoodID
        })[0];
        this.emotionSpecificFoods.push(result);
      }
    } else if(this.emotion=="Scared"){
      for(let happyFoodID of this.scaredFoodIDs){
        var result = foodNutritionData.foodData.filter(obj => {
          return obj.Ingredient_Code === happyFoodID
        })[0];
        this.emotionSpecificFoods.push(result);
      }
    } else if(this.emotion=="Stressed"){
      for(let happyFoodID of this.stressedFoodIDs){
        var result = foodNutritionData.foodData.filter(obj => {
          return obj.Ingredient_Code === happyFoodID
        })[0];
        this.emotionSpecificFoods.push(result);
      }
    } else if(this.emotion=="Bored"){
      for(let happyFoodID of this.boredFoodIDs){
        var result = foodNutritionData.foodData.filter(obj => {
          return obj.Ingredient_Code === happyFoodID
        })[0];
        this.emotionSpecificFoods.push(result);
      }
    } else if(this.emotion=="Distressed"){
      for(let happyFoodID of this.distressedFoodIDs){
        var result = foodNutritionData.foodData.filter(obj => {
          return obj.Ingredient_Code === happyFoodID
        })[0];
        this.emotionSpecificFoods.push(result);
      }
    }
  }

}
