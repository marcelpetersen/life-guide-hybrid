import { Component, OnInit } from '@angular/core';
import { NavParams } from 'ionic-angular';

import { Food } from '../../../food';
import { NutritionTablesComponent } from '../../../../components';

@Component({
    templateUrl: 'build/pages/fitness/meal-plans/meal-plan-nutrition/meal-plan-nutrition.html',
    directives: [NutritionTablesComponent]
})
export class MealPlanNutritionPage implements OnInit {
    public nutritionView: string = "total";
    public remainingNutrition: Food = new Food();
    public requiredNutrition: Food = new Food();
    public totalNutrition: Food = new Food();
    constructor(private _params: NavParams) { }

    ngOnInit() {
        if (this._params.data.totalNutrition) {
            this.totalNutrition = this._params.data.totalNutrition;
        }
        if (this._params.data.remainingNutrition) {
            this.remainingNutrition = this._params.data.remainingNutrition;
        }
        if (this._params.data.requiredNutrition) {
            this.requiredNutrition = this._params.data.requiredNutrition;
        }
     }

}