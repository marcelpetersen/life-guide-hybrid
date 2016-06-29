import { Component, OnInit } from '@angular/core';
import { MATERIAL_DIRECTIVES } from 'ng2-material';
import { NavController } from 'ionic-angular';
import { FirebaseListObservable } from 'angularfire2';

import { FoodDetailsPage } from '../food-details/food-details';
import { Food, FoodService } from '../shared';
import { ItemLimitPipe, ItemSearchPipe } from '../../shared';
import { NavbarComponent } from '../../../components';

@Component({
  templateUrl: 'build/pages/food/food-list/food-list.html',
  directives: [MATERIAL_DIRECTIVES, NavbarComponent],
  pipes: [ItemLimitPipe, ItemSearchPipe]
})
export class FoodListPage implements OnInit {
  public food: FirebaseListObservable<Food[]>;
  public limitQuery: number = 20;
  public searchQuery: string = '';
  constructor(private _foodService: FoodService, private _nav: NavController) { }

  public openFoodDetails(food: Food): void {
    this._nav.push(FoodDetailsPage, { food });
  }

  ngOnInit(): void {
    this.food = this._foodService.getFood();
  }
}
