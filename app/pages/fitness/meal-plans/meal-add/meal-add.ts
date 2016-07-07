import { Component, OnInit } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';
import { Alert, NavController, NavParams, ViewController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { FirebaseListObservable } from 'angularfire2';

import { Food, FoodService } from '../../../food';
import { ItemSearchPipe } from '../../../shared';
import { Recipe, RecipeService } from '../../../recipes';

@Component({
    templateUrl: 'build/pages/fitness/meal-plans/meal-add/meal-add.html',
    directives: [CORE_DIRECTIVES],
    pipes: [ItemSearchPipe]
})
export class MealAddPage implements OnInit {
    public food: FirebaseListObservable<Food[]>;
    public recipes: Observable<Recipe[]>;
    public selectedMeals: any[] = [];
    public searchQuery: string = '';
    constructor(
        private _foodService: FoodService,
        private _nav: NavController,
        private _params: NavParams,
        private _recipeService: RecipeService,
        private _viewCtrl: ViewController
    ) { }

    public cancelAdd(): void {
        this._viewCtrl.dismiss();
    }

    public doneAdding(): void {
        this._viewCtrl.dismiss(this.selectedMeals);
    }

    public setMeal(event: any, meal: any): void {
        if (!meal.hasOwnProperty('amount')) {
            Object.defineProperty(meal, 'amount', {
                value: 1,
                writable: true,
                enumerable: true,
                configurable: true
            });
        }
        let mealIndex = this.selectedMeals.indexOf(meal);
        if (mealIndex === -1) {
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
                            console.log('Canceled');
                        }
                    },
                    {
                        text: 'Save',
                        handler: data => {
                            meal.amount = +data.quantity;
                            this.selectedMeals.push(meal);
                        }
                    }
                ]
            });
            this._nav.present(quantityModal);
        } else {
            this.selectedMeals.splice(mealIndex, 1);
        }
    }

    ngOnInit() {
        this.food = this._foodService.getFood();
        this.recipes = this._recipeService.getAllRecipes();
    }

}