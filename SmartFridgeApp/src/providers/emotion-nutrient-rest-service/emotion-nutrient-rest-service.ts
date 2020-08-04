import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from  'rxjs/Observable';
import  'rxjs/add/operator/catch';
import  'rxjs/add/operator/map';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { foodNutritionData } from '../../data/foodNutritionData';
import { FoodEntry } from '../../objects/foodEntry';
import { Emotion } from '../../objects/emotion';

/*
  Generated class for the EmotionNutrientRestServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EmotionNutrientRestServiceProvider {

  baseUrl:string = "http://localhost:5000/";
  username: string="";
  uid: string="";
  fridge: any=[];
  emotionFoods: any=[];

  constructor(public http: HttpClient, public angularFireAuth: AngularFireAuth, public angularFireStore: AngularFirestore) {
    console.log('Hello EmotionNutrientRestServiceProvider Provider');
    this.angularFireAuth.authState.subscribe(res => {
      if (res && res.uid) {
         this.username=res.uid; 
         this.uid=res.uid;
      }
    });
  }

  initUser(){
    if(this.username!==""){
      return this.http.get(this.baseUrl + '/init_user/'+this.username);  
    }
  }

  predictEmotions(text){
    if(this.username!=="" && this.uid!==""){
      this.fridge = this.angularFireStore.doc<any>('users/'+this.uid).collection('fridge').valueChanges().subscribe((res)=>{
        for (let fridgeItem of res){
          var fridgeFoodData = foodNutritionData.foodData.filter(obj => {
            return obj.Ingredient_Code === fridgeItem["ingredientCode"]
          })[0];
          let emotionFood=this.http.get(this.baseUrl + 'predict_mood/'+this.username+"?protein="+fridgeFoodData["Protein"]+"&totalFat="+fridgeFoodData["Total Fat"]
          +"&carbohydrate="+fridgeFoodData["Carbohydrate"]+"&energy="+fridgeFoodData["Energy"]+"&alcohol="+fridgeFoodData["Alcohol"]
          +"&water="+fridgeFoodData["Water"]+"&caffeine="+fridgeFoodData["Caffeine"]+"&theobromine="+fridgeFoodData["Theobromine"]
          +"&sugars="+fridgeFoodData["Sugars"]+"&fiber="+fridgeFoodData["Fiber"]+"&calcium="+fridgeFoodData["Calcium"]+"&iron="+fridgeFoodData["Iron"]
          +"&magnesium="+fridgeFoodData["Magnesium"]+"&phosphorus="+fridgeFoodData["Phosphorus"]+"&potassium="+fridgeFoodData["Potassium"]
          +"&sodium="+fridgeFoodData["Sodium"]+"&zinc="+fridgeFoodData["Zinc"]+"&copper="+fridgeFoodData["Copper"]
          +"&selenium="+fridgeFoodData["Selenium"]+"&retinol="+fridgeFoodData["Retinol"]+"&vitA="+fridgeFoodData["Vitamin A"]
          +"&betaCarotene="+fridgeFoodData["Beta Carotene"]+"&alphaCarotene="+fridgeFoodData["Alpha Carotene"]+"&vitE="+fridgeFoodData["Vitamin E"]
          +"&vitD="+fridgeFoodData["Vitamin D"]+"&cryptoxanthin="+fridgeFoodData["Cryptoxanthin"]+"&Lycopene="+fridgeFoodData["Lycopene"]
          +"&Lutein="+fridgeFoodData["Lutein"]+"&vitC="+fridgeFoodData["Vitamin C"]+"&thiamin="+fridgeFoodData["Thiamin"]
          +"&riboflavin="+fridgeFoodData["Riboflavin"]+"&niacin="+fridgeFoodData["Niacin"]+"&vitB6="+fridgeFoodData["Vitamin B-6"]
          +"&folate="+fridgeFoodData["Folate"]+"&vitB12="+fridgeFoodData["Vitamin B-12"]+"&choline="+fridgeFoodData["Choline"]
          +"&vitK="+fridgeFoodData["Vitamin K"]+"&folicAcid="+fridgeFoodData["Folic acid"]
          +"&cholesterol="+fridgeFoodData["Cholesterol"]+"&fattyAcids="+fridgeFoodData["Fatty acids"]);
          this.emotionFoods.push(emotionFood);
        }
        text.innerHTML=JSON.stringify(this.emotionFoods[0]);
        return this.emotionFoods;
      });
    }
  }

  learn(foodEntry: FoodEntry, emotion: Emotion){
    //when the user is setting up their account, train this model on the food proven to help with different emotions AND on the foods which the user enters
    if(this.username!==""){
      var fridgeFoodData = foodNutritionData.foodData.filter(obj => {
        return obj.Ingredient_Code === foodEntry.food.ingredientCode
      })
        this.http.get(this.baseUrl + '/learn_behavior/'+this.username+"?protein="+fridgeFoodData["Protein"]+"&totalFat="+fridgeFoodData["Total Fat"]
        +"&carbohydrate="+fridgeFoodData["Carbohydrate"]+"&energy="+fridgeFoodData["Energy"]+"&alcohol="+fridgeFoodData["Alcohol"]
        +"&water="+fridgeFoodData["Water"]+"&caffeine="+fridgeFoodData["Caffeine"]+"&theobromine="+fridgeFoodData["Theobromine"]
        +"&sugars="+fridgeFoodData["Sugars"]+"&fiber="+fridgeFoodData["Fiber"]+"&calcium="+fridgeFoodData["Calcium"]+"&iron="+fridgeFoodData["Iron"]
        +"&magnesium="+fridgeFoodData["Magnesium"]+"&phosphorus="+fridgeFoodData["Phosphorus"]+"&potassium="+fridgeFoodData["Potassium"]
        +"&sodium="+fridgeFoodData["Sodium"]+"&zinc="+fridgeFoodData["Zinc"]+"&copper="+fridgeFoodData["Copper"]
        +"&selenium="+fridgeFoodData["Selenium"]+"&retinol="+fridgeFoodData["Retinol"]+"&vitA="+fridgeFoodData["Vitamin A"]
        +"&betaCarotene="+fridgeFoodData["Beta Carotene"]+"&alphaCarotene="+fridgeFoodData["Alpha Carotene"]+"&vitE="+fridgeFoodData["Vitamin E"]
        +"&vitD="+fridgeFoodData["Vitamin D"]+"&cryptoxanthin="+fridgeFoodData["Cryptoxanthin"]+"&Lycopene="+fridgeFoodData["Lycopene"]
        +"&Lutein="+fridgeFoodData["Lutein"]+"&vitC="+fridgeFoodData["Vitamin C"]+"&thiamin="+fridgeFoodData["Thiamin"]
        +"&riboflavin="+fridgeFoodData["Riboflavin"]+"&niacin="+fridgeFoodData["Niacin"]+"&vitB6="+fridgeFoodData["Vitamin B-6"]
        +"&folate="+fridgeFoodData["Folate"]+"&vitB12="+fridgeFoodData["Vitamin B-12"]+"&choline="+fridgeFoodData["Choline"]
        +"&vitK="+fridgeFoodData["Vitamin K"]+"&folicAcid="+fridgeFoodData["Folic acid"]
        +"&cholesterol="+fridgeFoodData["Cholesterol"]+"&fattyAcids="+fridgeFoodData["Fatty acids"]
        +"&mood="+emotion.emotionId);
    }
  }

}
