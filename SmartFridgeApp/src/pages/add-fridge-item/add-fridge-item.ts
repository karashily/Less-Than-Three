import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FoodAiServiceProvider } from '../../providers/food-ai-service/food-ai-service';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { normalizeURL } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-add-fridge-item',
  templateUrl: 'add-fridge-item.html',
})

export class AddFridgeItemPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public foodAiService: FoodAiServiceProvider,
    public camera: Camera) {
         
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

  getPhoto(sourceType){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: sourceType
    }
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = normalizeURL(imageData);
      this.uploadImage(base64Image);
     }, (err) => {
      // Handle error
      alert(err);
     });
  }
  ionViewDidLeave(){
    this.camera.cleanup;
  }

  uploadImage(imageURI){
    /*
    return new Promise<any>((resolve, reject) => {
      let storageRef = firebase.storage().ref();
      let imageRef = storageRef.child('image').child('imageName');
      this.encodeImageUri(imageURI, function(image64){
        imageRef.putString(image64, 'data_url')
        .then(snapshot => {
          resolve(snapshot.downloadURL)
        }, err => {
          reject(err);
        })
      })
    })
    */
  }

  encodeImageUri(imageUri, callback) {
    var c = document.createElement('canvas');
    var ctx = c.getContext("2d");
    var img = new Image();
    img.onload = function () {
      var aux:any = this;
      c.width = aux.width;
      c.height = aux.height;
      ctx.drawImage(img, 0, 0);
      var dataURL = c.toDataURL("image/jpeg");
      callback(dataURL);
    };
    img.src = imageUri;
  };

}
