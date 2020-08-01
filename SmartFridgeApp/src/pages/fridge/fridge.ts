import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { SignUpLogInPage } from '../signuplogin/signuplogin';
​
/**
 * Generated class for the FridgePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
​
@IonicPage()
@Component({
  selector: 'page-fridge',
  templateUrl: 'fridge.html',
})
export class FridgePage {

  title: any;

  hideSeeAllFridgeButton: boolean=true;
  hideSeeAllGroceryListButton: boolean=true;

  firestoreFridgeList: any;
  firestoreFridgeReferenceList: any;

  groceryList: any;
  groceryReferenceList: any; 

  noGroceryList: boolean=false;
​
  constructor(public navCtrl: NavController, public navParams: NavParams, public angularFireStore: AngularFirestore, public angularFireAuth: AngularFireAuth) {
    this.title = "Fridge"
  }

  ionViewDidLoad(){
    this.angularFireAuth.authState.subscribe(res => {
      if (res && res.uid) {
        this.firestoreFridgeList = this.angularFireStore.doc<any>('users/'+res.uid).collection('fridge').valueChanges();
        this.firestoreFridgeReferenceList=this.angularFireStore.doc<any>('users/'+res.uid).collection('fridge');

        if(this.firestoreFridgeList.length>5){
          this.hideSeeAllFridgeButton=false;
        }else{
          this.hideSeeAllFridgeButton=true;
        }

        this.groceryList = this.angularFireStore.doc<any>('users/'+res.uid).collection('groceryList').valueChanges();
        this.groceryReferenceList=this.angularFireStore.doc<any>('users/'+res.uid).collection('groceryList');

        if(this.groceryList.length>5){
          this.hideSeeAllGroceryListButton=false;
        }else{
          this.hideSeeAllGroceryListButton=true;
        }

        if(this.groceryList.length>0){
          this.noGroceryList=true;
        } else{
          this.noGroceryList=false;
        }

      } else {
        this.navCtrl.push(SignUpLogInPage, {}).then(()=>{
          const index = this.navCtrl.getActive().index;
          this.navCtrl.remove(0, index);
        });
      }
    });
  }

}
​