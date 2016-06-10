import { Component, OnInit } from '@angular/core';
import { NavParams } from 'ionic-angular';

import { Food } from '../shared';

@Component({
    templateUrl: 'build/pages/food/food-details/food-details.html'
})
export class FoodDetailsPage implements OnInit {
    food: Food;
    constructor(params: NavParams) {
        this.food = params.data.food;
     }

    ngOnInit() { }

}