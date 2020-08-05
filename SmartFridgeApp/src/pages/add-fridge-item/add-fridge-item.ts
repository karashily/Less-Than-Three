import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, normalizeURL } from 'ionic-angular';
import { FoodAiServiceProvider } from '../../providers/food-ai-service/food-ai-service';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { l } from '@angular/core/src/render3';
import { File } from '@ionic-native/file/ngx'; 
import 'firebase/storage';
import firebase from 'firebase';
import { foodNutritionData } from '../../data/foodNutritionData';
import * as Clarifai from 'clarifai'

@IonicPage()
@Component({
  selector: 'page-add-fridge-item',
  templateUrl: 'add-fridge-item.html',
})


export class AddFridgeItemPage {

  base64Image: string;
  initial: boolean=true;
  chooseFood: boolean=false;
  recognizedFoods: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public foodAiService: FoodAiServiceProvider,
    public camera: Camera, public file: File) {
         
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddFridgeItemPage');
  }

  takePhoto(){
    this.getPhoto(1);
  }

  chooseFromGallery(){
    this.getPhoto(0);
  }

  async getPhoto(sourceType){
    const options: CameraOptions = {
      quality: 100,
      encodingType: this.camera.EncodingType.JPEG,
      saveToPhotoAlbum: true,
      sourceType: sourceType,
      destinationType: this.camera.DestinationType.DATA_URL
    }
    this.camera.getPicture(options).then((imageData) => {
      console.log("IMAGE DATA: "+imageData)
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
      this.upload();
     }, (err) => {
      // Handle error
      alert("Error: "+err);
     })
  }

  upload() {
    var a=this;
    let storageRef = firebase.storage().ref();
    // Create a timestamp as filename
	
    const filename = Math.floor(Date.now() / 1000);

    // Create a reference to 'images/todays-date.jpg'
	
    const imageRef = storageRef.child(`images/${filename}.jpg`);

    imageRef.putString(this.base64Image, firebase.storage.StringFormat.DATA_URL)
      .then((snapshot)=> {
        // Do something here when the data is succesfully uploaded!
        const app = new Clarifai.App({
          apiKey: '1a915dd5151349768d67a60d780065a9'
         });
    
         app.models.predict(Clarifai.FOOD_MODEL, 
          snapshot.downloadURL).then(
            function(response) {
              console.log(JSON.stringify(response));
              let recognizedFood=response.outputs[0].data.concepts[0].name;
              alert(recognizedFood);
              a.initial=false;
              a.chooseFood=true;
              a.recognizedFoods = foodNutritionData.foodData.filter(obj => {
                return obj.Ingredient_Name.includes(recognizedFood) && !obj.Ingredient_Name.includes("Babyfood");
              })
            },
            function(err) {
              console.error("FOOD ERROR: "+JSON.stringify(err));
            }
          );
      });
  }

  ionViewDidLeave(){
    this.camera.cleanup;
  }

}
