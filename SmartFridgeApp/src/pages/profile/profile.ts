import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SignUpLogInPage } from '../signuplogin/signuplogin';
import { FirebaseAuthServiceProvider } from '../../providers/firebase-auth-service/firebase-auth-service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';

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
  fullName: any; 
  emailAddress: any;
  allergies: any;
  goal: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public firebaseAuthService: FirebaseAuthServiceProvider, public angularFireAuth: AngularFireAuth, public firestore: AngularFirestore) {
  	this.title="Profile"
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');

    this.angularFireAuth.authState.subscribe(res => {
      if (res && res.uid) {
        this.firestore.firestore.doc('/users/'+res.uid).get().then(docSnapshot => {
          if (docSnapshot.exists) {
            let data=docSnapshot.data();
            this.fullName=data.name;
            this.emailAddress=res.email;
            this.goal=data.goal;
          }
        });
      } else {
        this.navCtrl.push(SignUpLogInPage, {}).then(()=>{
          const index = this.navCtrl.getActive().index;
          this.navCtrl.remove(0, index);
        });
      }
    });
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
