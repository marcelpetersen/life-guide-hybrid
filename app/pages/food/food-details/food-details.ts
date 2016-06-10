import { Component, OnInit } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { MD_TOOLBAR_DIRECTIVES } from '@angular2-material/toolbar';
import { MATERIAL_DIRECTIVES } from 'ng2-material';

import { IFood } from '../shared';

@Component({
    templateUrl: 'build/pages/food/food-details/food-details.html',
    directives: [MATERIAL_DIRECTIVES, MD_TOOLBAR_DIRECTIVES]
})
export class FoodDetailsPage implements OnInit {
    food: IFood;
    constructor(params: NavParams) {
        this.food = params.data.food;
     }

    ngOnInit() { }

}