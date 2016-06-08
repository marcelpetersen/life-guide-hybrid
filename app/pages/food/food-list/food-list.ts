import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FirebaseListObservable } from 'angularfire2';

import { FoodService } from '../shared';

@Component({
  templateUrl: 'build/pages/food/food-list/food-list.html',
})
export class FoodListPage {
  food: FirebaseListObservable<any[]>;
  constructor(public nav: NavController, private _foodService: FoodService) {
    this.food = this._foodService.getFood();
  }
}
