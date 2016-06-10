import { Component } from '@angular/core';
import { MATERIAL_DIRECTIVES } from 'ng2-material';
import { NavController } from 'ionic-angular';

import { FoodDetailsPage } from '../food-details/food-details';
import { IFood, FoodService, FoodSearchPipe } from '../shared';

@Component({
  templateUrl: 'build/pages/food/food-list/food-list.html',
  directives: [MATERIAL_DIRECTIVES],
  pipes: [FoodSearchPipe]
})
export class FoodListPage {
  food: any;
  searchQuery: string = '';
  constructor(public nav: NavController, private _foodService: FoodService) {
    this.food = this._foodService.getFood();
  }

  openFoodDetails(food: IFood): void {
    this.nav.push(FoodDetailsPage, { food });
  }
}
