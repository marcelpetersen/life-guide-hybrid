import { Component, OnInit } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';
import { MATERIAL_DIRECTIVES } from 'ng2-material';
import { MdToolbar } from '@angular2-material/toolbar';
import { NavParams } from 'ionic-angular';

import { MealPlan } from '../shared';

@Component({
    templateUrl: 'build/pages/fitness/meal-plans/mp-details/mp-details.html',
    directives: [MATERIAL_DIRECTIVES, MdToolbar]
})
export class MpDetailsPage implements OnInit {
    public mealPlan: MealPlan;
    constructor(private _params: NavParams) { }

    ngOnInit(): void { 
        this.mealPlan = this._params.data.mealPlan;
    }

}