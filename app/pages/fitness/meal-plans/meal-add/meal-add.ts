import { Component, OnInit } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';
import { Alert, NavParams, ViewController } from 'ionic-angular';
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
        private _params: NavParams,
        private _recipeService: RecipeService,
        private _viewCtrl: ViewController
    ) { }

    public changeMeal(meal: Food): void {
        let mealIndex = this.selectedMeals.indexOf(meal);
        if (mealIndex !== -1) {
            this.selectedMeals.splice(mealIndex, 1);
        } else {
            if(!meal.hasOwnProperty('amount')) {
                Object.defineProperty(meal, 'amount', {
                    value: 1,
                    writable: true,
                    enumerable: true,
                    configurable: true
                });
            }
            this.selectedMeals.push(meal);
        }
    }

    public doneAdding(): void {
        this.selectedMeals.forEach(meal => {
            if (meal.hasOwnProperty('$key')) {
                delete meal['$key'];
            }
        });
        this._viewCtrl.dismiss(this.selectedMeals);
    }

    public cancelAdd(): void {
        this._viewCtrl.dismiss();
    }

    ngOnInit() {
        this.food = this._foodService.getFood();
        this.recipes = this._recipeService.getAllRecipes();
        if (!!this._params.data.meals) {
            this.selectedMeals = this._params.data.meals;
        }
    }

}