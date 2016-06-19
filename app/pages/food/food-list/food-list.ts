import { Component, OnInit } from '@angular/core';
import { MATERIAL_DIRECTIVES } from 'ng2-material';
import { NavController } from 'ionic-angular';

import { FoodDetailsPage } from '../food-details/food-details';
import { Food, FoodService } from '../shared';
import { ItemSearchPipe } from '../../shared';
import { NavbarComponent } from '../../../components';

@Component({
  templateUrl: 'build/pages/food/food-list/food-list.html',
  directives: [MATERIAL_DIRECTIVES, NavbarComponent],
  pipes: [ItemSearchPipe]
})
export class FoodListPage implements OnInit {
  food: any;
  searchQuery: string = '';
  constructor(private _foodService: FoodService, private _nav: NavController) { }

  openFoodDetails(food: Food): void {
    this._nav.push(FoodDetailsPage, { food });
  }

  ngOnInit(): void {
    this.food = this._foodService.getFood();
  }
}
