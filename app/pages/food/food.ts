import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

/*
  Generated class for the FoodPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/food/food.html',
})
export class FoodPage {
  food: FirebaseListObservable<any[]>;
  constructor(public nav: NavController, af: AngularFire) {
    this.food = af.database.list('/food');
  }
}
