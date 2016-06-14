import { Component, OnInit } from '@angular/core';
import { Alert, NavController, NavParams, ViewController } from 'ionic-angular';

import { Food, FoodSearchPipe, FoodService } from '../../../food';
import { MealPlan } from '../shared';
import { Recipe, RecipeService } from '../../../recipes';

@Component({
    templateUrl: 'build/pages/fitness/meal-plans/meal-add/meal-add.html',
    pipes: [FoodSearchPipe]
})
export class MealAddPage implements OnInit {
    food: any;
    recipes: any;
    mealPlan: MealPlan;
    mealTimeChoose: boolean;
    selectedMeals: any[] = [];
    selectedMealTimes: string[] = [];
    searchQuery: string = '';
    constructor(
        private _foodService: FoodService,
        private _nav: NavController,
        private _params: NavParams,
        private _recipeService: RecipeService,
        private _viewCtrl: ViewController
    ) { }

    changeMeal(meal): void {
        let mealIndex = this.selectedMeals.indexOf(meal);
        if (mealIndex !== -1) {
            this.selectedMeals.splice(mealIndex, 1);
            this.selectedMealTimes.splice(mealIndex, 1);
        } else {
            this.selectedMeals.push(meal);
        }
    }

    chooseMealTime(event, meal): void {
        let mealIndex = this.selectedMeals.indexOf(meal);
        if (mealIndex !== -1) {
            let alert = Alert.create();
            alert.setTitle('Meal time');

            alert.addInput({
                type: 'radio',
                label: 'Breakfast',
                value: 'Breakfast',
                checked: this.selectedMealTimes[this.selectedMeals.indexOf(meal)] === 'Breakfast'
            });

            alert.addInput({
                type: 'radio',
                label: 'Brunch',
                value: 'Brunch',
                checked: this.selectedMealTimes[this.selectedMeals.indexOf(meal)] === 'Brunch'
            });

            alert.addInput({
                type: 'radio',
                label: 'Lunch',
                value: 'Lunch',
                checked: this.selectedMealTimes[this.selectedMeals.indexOf(meal)] === 'Lunch'
            });

            alert.addInput({
                type: 'radio',
                label: 'Snack',
                value: 'Snack',
                checked: this.selectedMealTimes[this.selectedMeals.indexOf(meal)] === 'Snack'
            });

            alert.addInput({
                type: 'radio',
                label: 'Dinner',
                value: 'Dinner',
                checked: this.selectedMealTimes[this.selectedMeals.indexOf(meal)] === 'Dinner'
            });

            alert.addButton('Cancel');
            alert.addButton({
                text: 'Ok',
                handler: mealTime => {
                    this.mealTimeChoose = false;
                    if (mealTime) {
                        this.selectedMealTimes.push(mealTime);
                    } else {
                        this.selectedMeals.splice(mealIndex, 1);
                    }
                }
            });

            this._nav.present(alert).then(() => {
                this.mealTimeChoose = true;
            });
        }
    }

    doneAdding(): void {
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
        this._viewCtrl.dismiss(this.mealPlan);
    }

    cancelAdd(): void {
        this._viewCtrl.dismiss();
    }

    ngOnInit() {
        this.food = this._foodService.getFood();
        this.recipes = this._recipeService.getRecipes();
        this.mealPlan = this._params.data.mealPlan;
    }

}