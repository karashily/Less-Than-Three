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

  detector: any;
  
  @ViewChild(Navbar) navBar: Navbar;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
    var divRoot=document.querySelector("#affdex_elements");
    var width = 640;
    var height = 480;
    var faceMode = affdex.FaceDetectorMode.LARGE_FACES;

    this.detector = new affdex.CameraDetector(divRoot, width, height, faceMode);

    this.detector.detectAllEmotions();
    this.detector.detectAllExpressions();
    this.detector.detectAllEmojis();
    this.detector.detectAllAppearance();

    this.detector.addEventListener("onInitializeSuccess", function() {
      this.log('#logs', "The detector reports initialized");
      //Display canvas instead of video feed because we want to draw the feature points on it
      document.querySelector("#face_video_canvas").setAttribute("style", "display: block;");
      document.querySelector("#face_video").setAttribute("style", "display: none;");
    });

    this.detector.addEventListener("onWebcamConnectSuccess", function() {
      this.log('#logs', "Webcam access allowed");
    });
    
    //Add a callback to notify when camera access is denied
    this.detector.addEventListener("onWebcamConnectFailure", function() {
      this.log('#logs', "webcam denied");
      console.log("Webcam access denied");
    });

    this.detector.addEventListener("onStopSuccess", function() {
      this.log('#logs', "The detector reports stopped");
      document.querySelector("#results").innerHTML = "";
    });

    this.detector.addEventListener("onImageResultsSuccess", function(faces, image, timestamp) {
      document.querySelector('#results').innerHTML = "";
      this.log('#results', "Timestamp: " + timestamp.toFixed(2));
      this.log('#results', "Number of faces found: " + faces.length);
      if (faces.length > 0) {
        this.log('#results', "Appearance: " + JSON.stringify(faces[0].appearance));
        this.log('#results', "Emotions: " + JSON.stringify(faces[0].emotions, function(key, val) {
          return val.toFixed ? Number(val.toFixed(0)) : val;
        }));
        this.log('#results', "Expressions: " + JSON.stringify(faces[0].expressions, function(key, val) {
          return val.toFixed ? Number(val.toFixed(0)) : val;
        }));
        this.log('#results', "Emoji: " + faces[0].emojis.dominantEmoji);
        if(document.querySelector('#face_video_canvas') != null)
        this.drawFeaturePoints(image, faces[0].featurePoints);
      }
    
      setTimeout(this.detector.captureNextImage, 150);
    });
  }

  drawFeaturePoints(img, featurePoints) {
    var contxt = document.querySelector('#face_video_canvas')[0].getContext('2d');
  
    var hRatio = contxt.canvas.width / img.width;
    var vRatio = contxt.canvas.height / img.height;
    var ratio = Math.min(hRatio, vRatio);
  
    contxt.strokeStyle = "#FFFFFF";
    for (var id in featurePoints) {
      contxt.beginPath();
      contxt.arc(featurePoints[id].x,
        featurePoints[id].y, 2, 0, 2 * Math.PI);
      contxt.stroke();
    }
  }

   onStart() {
    if (this.detector && !this.detector.isRunning) {
      document.querySelector("#logs").innerHTML = "";
      this.detector.start(JSSDK.Assets.wasm);
    }
    this.log('#logs', "Clicked the start button");
  }
  
  //function executes when the Stop button is pushed.
  onStop() {
    this.log('#logs', "Clicked the stop button");
    if (this.detector && this.detector.isRunning) {
      this.detector.removeEventListener();
      this.detector.stop();
    }
  };
  
  //function executes when the Reset button is pushed.
  onReset() {
    this.log('#logs', "Clicked the reset button");
    if (this.detector && this.detector.isRunning) {
      this.detector.reset();
  
      document.querySelector('#results').innerHTML = "";
    }
  };

  log(node_name, msg) {
    document.querySelector(node_name).innerHTML += "<span>" + msg + "</span><br />";
  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad FacialEmotionPage');
  }

  setBackButtonAction(){
    this.navBar.backButtonClick = () => {
       this.navCtrl.pop()
    }
 }
}
