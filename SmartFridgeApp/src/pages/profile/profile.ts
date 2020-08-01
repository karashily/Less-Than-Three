import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SignUpLogInPage } from '../signuplogin/signuplogin';
import { FirebaseAuthServiceProvider } from '../../providers/firebase-auth-service/firebase-auth-service';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  title: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public firebaseAuthService: FirebaseAuthServiceProvider) {
  	this.title="Profile"
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  logOut(){
    this.firebaseAuthService.signOut().then((res)=>{
      this.navCtrl.push(SignUpLogInPage).then(()=>{
        const index = this.navCtrl.getActive().index;
        this.navCtrl.remove(0, index);
      });
    });
  }

}
