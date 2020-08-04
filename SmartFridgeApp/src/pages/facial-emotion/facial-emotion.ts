import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Navbar } from 'ionic-angular';
import { EmotionNutrientRestServiceProvider } from '../../providers/emotion-nutrient-rest-service/emotion-nutrient-rest-service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { SignUpLogInPage } from '../signuplogin/signuplogin';
import { FoodEntry } from '../../objects/foodEntry';
import { Food } from '../../objects/food';

/**
 * Generated class for the FacialEmotionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var affdex;

var JSSDK = JSSDK || {};
JSSDK.Assets = {
  "wasm": {
      "affdex-native-bindings.wasm": "https://download.affectiva.com/js/wasm/affdex-native-bindings.wasm",
      "affdex-native-bindings.js": "https://download.affectiva.com/js/wasm/affdex-native-bindings.js",
      "affdex-native-bindings.data": "https://download.affectiva.com/js/wasm/affdex-native-bindings.data",
      "affdex-worker.js": "https://download.affectiva.com/js/wasm/affdex-worker.js"
  }
};

@IonicPage()
@Component({
  selector: 'page-facial-emotion',
  templateUrl: 'facial-emotion.html',
})
export class FacialEmotionPage {

  detector1: any;

  title: any="EMOTION DETECTION"
  fridge: any=[];

  checkEmotion: boolean=false;
  preliminary: boolean=true;
  foodChoices: boolean=false;

  emotionId: string="-1";

  emotionFoods: any=[];
  recipes: any=[];
  emotionsArray: any=[];
  
  @ViewChild(Navbar) navBar: Navbar;

  constructor(public navCtrl: NavController, public navParams: NavParams, public emotionNutrientRestService: EmotionNutrientRestServiceProvider,
    public angularFireAuth: AngularFireAuth, public angularFireStore: AngularFirestore) {
      this.emotionNutrientRestService.initUser();

    var a = this;

    var divRoot=document.querySelector("#affdex_elements");
    var width = 640;
    var height = 480;
    var faceMode = affdex.FaceDetectorMode.LARGE_FACES;

    this.detector1 = new affdex.CameraDetector(divRoot, width, height, faceMode);

    this.detector1.detectAllEmotions();

    this.detector1.addEventListener("onInitializeSuccess", function() {
      console.log("The detector reports initialized");
    });

    this.detector1.addEventListener("onWebcamConnectSuccess", function() {
      console.log("Webcam access allowed");
    });
    
    //Add a callback to notify when camera access is denied
    this.detector1.addEventListener("onWebcamConnectFailure", function() {
      console.log("Webcam access denied");
      document.querySelector("#one").innerHTML="Please enable your camera access.";
      document.querySelector("#two").innerHTML="";
    });

    this.detector1.addEventListener("onStopSuccess", function() {
      console.log("The detector reports stopped");
    });

    this.detector1.addEventListener("onImageResultsSuccess", function(faces, image, timestamp) {
      if (faces.length > 0) {
        var emotionsJSON=faces[0].emotions;
        let joy=emotionsJSON.joy;
        let sadness=emotionsJSON.sadness;
        let disgust=emotionsJSON.disgust-30;
        let anger=emotionsJSON.anger;
        let fear=emotionsJSON.fear;
        /*
        Happy: 0
        Sad: 1
        Angry: 2
        Disgusted: 3
        Scared: 4
        Stressed: 5
        Bored: 6
        Distressed: 7*/
        let emotions=[
          {
            name:"joy", 
            number:joy
          }, {
            name:"sadness", 
            number:sadness
          }, {
            name:"disgust", 
            number:disgust
          }, {
            name:"anger", 
            number:anger
          }, {
            name:"fear", 
            number:fear
          }];
        let maxEmotionNumber=Math.max.apply(Math, emotions.map(function(o) { return o.number; }));
        let maxEmotion=emotions[emotions.findIndex(x => x.number ===maxEmotionNumber)].name;
        if (maxEmotion=="joy") a.emotionId="0";
        else if(maxEmotion=="sadness") a.emotionId="1";
        else if(maxEmotion=="disgust") a.emotionId="3";
        else if(maxEmotion=="anger") a.emotionId="2";
        else if(maxEmotion=="fear") a.emotionId="4";

        if (emotionsJSON.engagement<0.08){
          a.emotionId="6";
          document.querySelector('#one').innerHTML = "<span>Are you feeling bored?</span><br />";
        }else{
          document.querySelector('#one').innerHTML = "<span>Are you feeling " +maxEmotion + "?</span><br />";
        }
        document.querySelector("#two").innerHTML="";
        a.checkEmotion=true;
        a.onStop();
      } else{
        document.querySelector("#one").innerHTML="No faces found!";
        document.querySelector("#two").innerHTML="";
      }
    });


    this.onStart();
  }

   onStart() {
    if (this.detector1 && !this.detector1.isRunning) {
      this.detector1.start(JSSDK.Assets.wasm);
    }
    console.log("Clicked the start button");
  }
  
  //function executes when the Stop button is pushed.
  onStop() {
    console.log("Clicked the stop button");
    if (this.detector1 && this.detector1.isRunning) {
      this.detector1.removeEventListener();
      this.detector1.stop();
    }
  };
  
  //function executes when the Reset button is pushed.
  onReset() {
    console.log("Clicked the reset button");
    if (this.detector1 && this.detector1.isRunning) {
      this.detector1.reset();
    }
  };
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad FacialEmotionPage');
  }

  ionViewDidLeave(){
    this.onStop();
    this.onReset();
  }

  setBackButtonAction(){
    this.navBar.backButtonClick = () => {
       this.navCtrl.pop()
    }
 }

yesEmotion(){
    this.checkEmotion=false;
    this.preliminary=true;
    document.querySelector("#one").innerHTML="";
    document.querySelector("#two").innerHTML="Checking your fridge for food which corresponds with your emotions...";
    this.angularFireAuth.authState.subscribe(res => {
      if (res && res.uid) {
        this.fridge = this.angularFireStore.doc<any>('users/'+res.uid).collection('fridge').valueChanges().subscribe((res)=>{
          this.getFoodForMood(res);
        });
      } else {
        this.navCtrl.push(SignUpLogInPage, {}).then(()=>{
          const index = this.navCtrl.getActive().index;
          this.navCtrl.remove(0, index);
        });
      }
    });
 }

 async getFoodForMood(fridge){
  if(fridge.length>0){
    this.preliminary=true;
    this.emotionsArray=this.emotionNutrientRestService.predictEmotions( document.querySelector("#two"));
  }else{
    this.preliminary=true;
    document.querySelector("#two").innerHTML="There is no food in your fridge!";
  }
 }

  noEmotion(){

  }

  getAllIndexes(arr, val) {
    var indexes = [], i = -1;
    while ((i = arr.indexOf(val, i+1)) != -1){
      indexes.push(i);
    }
    return indexes;
  }

  scrapeForRecipes(selectedFood, allOtherRecommendedFoods){
    var baseURL="https://www.bigoven.com/";
    let ingredientName=selectedFood.foodName;
    var words = ingredientName.split(" ");
    var otherRecipesIndex=allOtherRecommendedFoods.length;
    while(this.recipes.length<=10){
      var index=0;
      for (let word of words){
        if(index!==words.length-1){
          baseURL+=word+"%20";
          index++;
        }else{
          baseURL+=word;
          index++;
        }
      }
    }
  }
}
