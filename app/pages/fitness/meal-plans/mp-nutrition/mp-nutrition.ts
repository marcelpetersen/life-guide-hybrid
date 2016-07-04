import { Component, OnInit } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';
import { NavParams } from 'ionic-angular';

import { Food } from '../../../food';
import { NutritionTablesComponent } from '../../../../components';

@Component({
    templateUrl: 'build/pages/fitness/meal-plans/mp-nutrition/mp-nutrition.html',
    directives: [CORE_DIRECTIVES, NutritionTablesComponent]
})
export class MpNutritionPage implements OnInit {
    public nutritionView: string = "total";
    public remainingIntake: Food = new Food();
    public requiredNutrition: Food = new Food();
    public dailyNutrition: Food = new Food();
    public reportView: boolean = true;
    public totalIntake: Food = new Food();
    constructor(private _params: NavParams) { }

    public changeView(): void {
        this.reportView = !this.reportView;
    }

    ngOnInit() {
        if (this._params.data.totalIntake) {
            this.totalIntake = this._params.data.totalIntake;
        }
        if (this._params.data.remainingIntake) {
            this.remainingIntake = this._params.data.remainingIntake;
        }
        if (this._params.data.requiredNutrition) {
            this.requiredNutrition = this._params.data.requiredNutrition;
        }
        if (this._params.data.dailyNutrition) {
            this.dailyNutrition = this._params.data.dailyNutrition;
        }
     }

}