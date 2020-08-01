import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Navbar } from 'ionic-angular';

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
  
  @ViewChild(Navbar) navBar: Navbar;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
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
        let contempt=emotionsJSON.contempt;
        let anger=emotionsJSON.anger;
        let fear=emotionsJSON.fear;
        let surprise=emotionsJSON.surprise;
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
            name:"contempt", 
            number:contempt
          }, {
            name:"anger", 
            number:anger
          }, {
            name:"fear", 
            number:fear
          }, {
            name:"surprise", 
            number:surprise
          }];
        let maxEmotionNumber=Math.max.apply(Math, emotions.map(function(o) { return o.number; }));
        let maxEmotion=emotions[emotions.findIndex(x => x.number ===maxEmotionNumber)].name

        if (emotionsJSON.engagement<0.08){
          document.querySelector('#one').innerHTML = "<span>Are you feeling bored?</span><br />";
        }else{
          document.querySelector('#one').innerHTML = "<span>Are you feeling " +maxEmotion + "?</span><br />";
        }
        document.querySelector("#two").innerHTML="";
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
  
      document.querySelector('#results').innerHTML = "";
    }
  };
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad FacialEmotionPage');
  }

  ionViewDidLeave(){
    this.onStop();
  }

  setBackButtonAction(){
    this.navBar.backButtonClick = () => {
       this.navCtrl.pop()
    }
 }
}
