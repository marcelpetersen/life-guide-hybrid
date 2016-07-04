import { Component, OnInit } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';
import { Alert, NavController, NavParams, ViewController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
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

    public changeMeal(meal: Food): void {
        let mealIndex = this.selectedMeals.indexOf(meal);
        if (mealIndex !== -1) {
            this.selectedMeals.splice(mealIndex, 1);
        } else {
            this.selectedMeals.push(meal);
        }
    }
    /*
    public chooseMealTime(event: any, meal: Food): void {
        let mealIndex = this.selectedMeals.indexOf(meal);
        if (mealIndex !== -1) {
            let mealTimeAlert = Alert.create({
                title: 'Meal time',
                inputs: [
                    {
                        type: 'radio',
                        label: 'Breakfast',
                        value: 'Breakfast',
                        checked: this.selectedMealTimes[this.selectedMeals.indexOf(meal)] === 'Breakfast'
                    }, {
                        type: 'radio',
                        label: 'Brunch',
                        value: 'Brunch',
                        checked: this.selectedMealTimes[this.selectedMeals.indexOf(meal)] === 'Brunch'
                    },
                    {
                        type: 'radio',
                        label: 'Lunch',
                        value: 'Lunch',
                        checked: this.selectedMealTimes[this.selectedMeals.indexOf(meal)] === 'Lunch'
                    }, {
                        type: 'radio',
                        label: 'Snack',
                        value: 'Snack',
                        checked: this.selectedMealTimes[this.selectedMeals.indexOf(meal)] === 'Snack'
                    }, {
                        type: 'radio',
                        label: 'Dinner',
                        value: 'Dinner',
                        checked: this.selectedMealTimes[this.selectedMeals.indexOf(meal)] === 'Dinner'
                    }
                ],
                buttons: [
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        handler: mealTime => {
                            this.mealTimeChoose = false;
                            this.selectedMeals.splice(mealIndex, 1);
                        }
                    },
                    {
                        text: 'Ok',
                        handler: mealTime => {
                            this.mealTimeChoose = false;
                            if (mealTime) {
                                this.selectedMealTimes.push(mealTime);
                            } else {
                                this.selectedMeals.splice(mealIndex, 1);
                            }
                        }
                    }
                ]
            });

            this._nav.present(mealTimeAlert).then(() => this.mealTimeChoose = true);
        }
    */

    public doneAdding(): void {
        /*
        if (!this.mealPlan.meals) {
            this.mealPlan.meals = {
                Breakfast: [],
                Brunch: [],
                Lunch: [],
                Snack: [],
                Dinner: []
            };
        }
        this.selectedMeals.forEach((meal, index) => {
            meal.amount = 1;
            if (meal.hasOwnProperty('$key')) {
                delete meal['$key'];
            }
            let mealTime = this.selectedMealTimes[index];
            if (this.mealPlan.meals.hasOwnProperty(mealTime)) {
                this.mealPlan.meals[mealTime].push(meal);
            } else {
                this.mealPlan.meals[mealTime] = [];
                this.mealPlan.meals[mealTime].push(meal);
            }
        });
        */
        this._viewCtrl.dismiss(this.selectedMeals);
    }

    public cancelAdd(): void {
        this._viewCtrl.dismiss();
    }

    ngOnInit() {
        this.food = this._foodService.getFood();
        this.recipes = this._recipeService.getAllRecipes();
        this.selectedMeals = this._params.data.meals;
    }

}