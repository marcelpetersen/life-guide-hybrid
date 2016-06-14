import { Component, OnInit } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { MD_TOOLBAR_DIRECTIVES } from '@angular2-material/toolbar';
import { MATERIAL_DIRECTIVES } from 'ng2-material';

import { Food } from '../shared';
import { NutritionTablesComponent } from '../../../components';

@Component({
    templateUrl: 'build/pages/food/food-details/food-details.html',
    directives: [MATERIAL_DIRECTIVES, MD_TOOLBAR_DIRECTIVES, NutritionTablesComponent]
})
export class FoodDetailsPage implements OnInit {
    food: Food;
    constructor(private _params: NavParams) { }

    ngOnInit() { 
        this.food = this._params.data.food;
     }

}