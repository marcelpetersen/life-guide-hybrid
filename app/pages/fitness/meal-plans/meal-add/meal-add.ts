import { Component, OnInit } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';
import { Alert, NavController, NavParams, ViewController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { FirebaseListObservable } from 'angularfire2';

import { Food, FoodDetailsPage } from '../../../food';
import { ItemLimitPipe, ItemSearchPipe } from '../../../shared';
import { Recipe } from '../../../recipes';

@Component({
    templateUrl: 'build/pages/fitness/meal-plans/meal-add/meal-add.html',
    directives: [CORE_DIRECTIVES],
    pipes: [ItemLimitPipe, ItemSearchPipe]
})
export class MealAddPage implements OnInit {
    public checked: boolean[] = [];
    public meals: Recipe[] | Food[];
    public limitQuery: number = 10;
    public selectedMeals: any[] = [];
    public searchQuery: string = '';
    constructor(
        private _nav: NavController,
        private _params: NavParams,
        private _viewCtrl: ViewController
    ) { }

    public cancelAdd(): void {
        this._viewCtrl.dismiss();
    }

    public doneAdding(): void {
        this._viewCtrl.dismiss(this.selectedMeals);
    }

    public loadMore(infiniteScroll) {
        setTimeout(() => {
            this.limitQuery += 5;
            infiniteScroll.complete();
        }, 500);
    }

    public setMeal(meal: any, checkEl: any): void {
        let idx = this.selectedMeals.indexOf(meal);
        if (idx >= 0) {
            this.selectedMeals.splice(this.selectedMeals.indexOf(meal), 1);
        } else {
            if (!meal.hasOwnProperty('amount')) {
                Object.defineProperty(meal, 'amount', {
                    value: 1,
                    writable: true,
                    enumerable: true,
                    configurable: true
                });
            }
            let quantityModal = Alert.create({
                title: `${meal.name}`,
                message: "Enter quantity",
                inputs: [
                    {
                        name: 'quantity',
                        placeholder: meal.hasOwnProperty('chef') ? 'Units' : 'Grams',
                        type: 'number'
                    },
                ],
                buttons: [
                    {
                        text: 'Cancel',
                        handler: () => {
                            checkEl.checked = false;
                        }
                    },
                    {
                        text: 'Save',
                        handler: data => {
                            if (!!data.quantity) {
                                meal.amount = +data.quantity;
                                this.selectedMeals.push(meal);
                            } else {
                                checkEl.checked = false;
                            }
                        }
                    }
                ]
            });
            this._nav.present(quantityModal);
        }
    }

    ngOnInit() {
        this.meals = this._params.data.meals;
    }

}