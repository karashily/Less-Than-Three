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

  lessHappyFoodIDs: any=["9209","14130","18248","14179","14625","19088","1077","36014","21464","19047","43276","7057","7961","16123","10862","18155",
"42236","19068","19069","19070","19142"];
  moreSadFoodIDs: any=[];
  moreStressedFoodIDs: any=["8510", "8546","19438", "19896", "19905", "19910", "19913", "19914","19917","19919","19921","19922","19923","28312","28313","42173",
  "100173","7005","7014","14179","14201","14202","14210","14552","21464","36014","7057","14174","21151","14021","18090","18095","18151","18248",
"11135","11994","19003","27043","9400","42236"];
  moreDistressedFoodIDs: any=["8510", "8546","19438", "19896", "19905", "19910", "19913", "19914","19917","19919","19921","19922","19923","28312","28313","42173",
  "100173","7005","7014","14179","14201","14202","14210","14552","21464","36014","7057","14174","21151","14021","18090","18095","18151","18248",
"11135","11994","19003","27043","9400","42236"];
  moreScaredFoodIDs: any=["8510", "8546","19438", "19896", "19905", "19910", "19913", "19914","19917","19919","19921","19922","19923","28312","28313","42173",
  "100173","7005","7014","14179","14201","14202","14210","14552","21464","36014","7057","14174","21151","14021","18090","18095","18151","18248",
"11135","11994","19003","27043","9400","42236"];
  moreBoredFoodIDs: any=["21090","36014","19068","19069","19070","19142","19151","19152","21224","28312","42283","18258","9070","20120",
  "22247","42236","18155","27035","43506","43541","1077","42140"];
  moreAngryFoodIDs: any=["11529","11209","36014","21090","18090","18096","18155","18015","4610","21224","18248",
  "21464","25001","25026","25064","28303","19068","19069","19070","19142","19151","19293","42236","10862","42140"];
  moreDisgustedFoodIDs: any=["11529","11209","36014","21090","18090","18096","18155","18015","4610","21224","18248",
  "21464","25001","25026","25064","28303","19068","19069","19070","19142","19151","19293","42236","10862","42140"];

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
