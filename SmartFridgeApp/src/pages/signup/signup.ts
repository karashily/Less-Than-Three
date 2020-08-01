import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FirebaseAuthServiceProvider } from '../../providers/firebase-auth-service/firebase-auth-service';
import { TabsPage } from '../tabs/tabs';
import { User } from '../../objects/user';
import { FoodEntry } from '../../objects/foodEntry';
import { Food } from '../../objects/food';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})

export class SignUpPage {

  name: string;
  email: string;
  password: string;
  repeatPassword: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public firebaseAuthService: FirebaseAuthServiceProvider, public toastCtrl: ToastController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  register(){
    if(this.password && this.name && this.email && this.repeatPassword){
      if(this.validateEmail(this.email)===true){
        if(this.repeatPassword===this.password){
          this.firebaseAuthService.registerUser(this.email, this.password).then((res) => {
            var foodEntries=new Map();
            var fridge:any=[];
            var groceryList: any=[];
            var userData: User={
              uid: res.uid,
              name: this.name,
              foodEntries: foodEntries,
              fridge: fridge,
              groceryList: groceryList
            }
            this.firebaseAuthService.setUserData(userData).then((userData)=>{
              this.navCtrl.push(TabsPage, {}).then(()=>{
                const index = this.navCtrl.getActive().index;
                this.navCtrl.remove(0, index);
              });
            });
          }).catch((error) => {
            let toast = this.toastCtrl.create({
              message: error.message,
              duration: 3000
          });
          toast.present();
          })
        }else{
          let toast = this.toastCtrl.create({
              message: 'Your passwords do not match.',
              duration: 3000
          });
          toast.present();
        }
      }else{
        let toast = this.toastCtrl.create({
                        message: 'Please enter a valid email address.',
                        duration: 3000
                      });
                      toast.present();
                
      }
    }else{
       let toast = this.toastCtrl.create({
                        message: 'Please enter all fields.',
                        duration: 3000
                      });
                      toast.present();  
    }
  }

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

}
