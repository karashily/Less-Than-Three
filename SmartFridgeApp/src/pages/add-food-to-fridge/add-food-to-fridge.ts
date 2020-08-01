import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { foodNutritionData } from '../../data/foodNutritionData';

/**
 * Generated class for the AddFoodToFridgePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-food-to-fridge',
  templateUrl: 'add-food-to-fridge.html',
})
export class AddFoodToFridgePage {


  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddFoodToFridgePage');
  }

}
