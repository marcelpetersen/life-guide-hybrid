import { Component, OnInit } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';
import { NavParams } from 'ionic-angular';

import { Food } from '../../../food';
import { NutritionTablesComponent } from '../../../../components';

@Component({
    templateUrl: 'build/pages/fitness/meal-plans/meal-plan-nutrition/meal-plan-nutrition.html',
    directives: [CORE_DIRECTIVES, NutritionTablesComponent]
})
export class MealPlanNutritionPage implements OnInit {
    public nutritionView: string = "total";
    public remainingNutrition: Food = new Food();
    public requiredNutrition: Food = new Food();
    public statisticNutrition: Food = new Food();
    public statsView: boolean = true;
    public totalNutrition: Food = new Food();
    constructor(private _params: NavParams) { }

    public changeView(): void {
        this.statsView = !this.statsView;
    }

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
        if (this._params.data.statisticNutrition) {
            this.statisticNutrition = this._params.data.statisticNutrition;
        }
     }

}