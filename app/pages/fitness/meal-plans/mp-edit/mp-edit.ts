import { Component, OnInit } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';
import { Modal, NavController, NavParams, Toast, ViewController } from 'ionic-angular';

import { MealAddPage } from '../meal-add/meal-add';
import { MealPlan } from '../shared';

@Component({
    templateUrl: 'build/pages/fitness/meal-plans/mp-edit/mp-edit.html'
})
export class MpEditPage implements OnInit {
    public mpDate: string;
    public mealPlan: MealPlan;
    constructor(private _nav: NavController, private _params: NavParams, private _viewCtrl: ViewController) { }

    public cancelMp(): void {
        this._viewCtrl.dismiss();
    }

    public createMp(): void {
        
    }

    public searchMeal(mpTime: string): void {
        let mealAddModal = Modal.create(MealAddPage, { meals: this.mealPlan[mpTime].meals });
        mealAddModal.onDismiss(meals => {
            if (!!meals) {
                this.mealPlan[mpTime].meals = meals;
            }
        });
        this._nav.present(mealAddModal);
    }

    public removeMeal(mpTime: string, index: number): void {
        this.mealPlan[mpTime].meals.splice(index, 1);
    }

    ngOnInit() {
        let myDate = new Date(),
            currentDay = myDate.getDate(),
            currentMonth = myDate.getMonth() + 1,
            currentYear = myDate.getFullYear();
        this.mpDate = currentYear + '-' +
            ((currentMonth < 10) ? '0' + currentMonth : currentMonth) + '-' +
            ((currentDay < 10) ? '0' + currentDay : currentDay);
        this.mealPlan = this._params.data.mealPlan;
    }

}