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
    public numericIntake: Food = new Food();
    public nutritionView: string = "total";
    public percentIntake: Food = new Food();
    public remainingIntake: Food = new Food();
    public percentageView: boolean = true;
    public requiredIntake: Food = new Food();
    constructor(private _params: NavParams) { }

    public changeView(): void {
        this.percentageView = !this.percentageView;
    }

    ngOnInit() {
        if (this._params.data.numericIntake) {
            this.numericIntake = this._params.data.numericIntake;
        }
        if (this._params.data.remainingIntake) {
            this.remainingIntake = this._params.data.remainingIntake;
        }
        if (this._params.data.requiredIntake) {
            this.requiredIntake = this._params.data.requiredIntake;
        }
        if (this._params.data.percentIntake) {
            this.percentIntake = this._params.data.percentIntake;
        }
     }

}