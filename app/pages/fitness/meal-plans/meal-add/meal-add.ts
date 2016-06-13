import { Component, OnInit } from '@angular/core';
import { Alert, NavController, NavParams, ViewController } from 'ionic-angular';

import { Food, FoodSearchPipe,  FoodService } from '../../../food';
import { Recipe, RecipeService } from '../../../recipes';

@Component({
    templateUrl: 'build/pages/fitness/meal-plans/meal-add/meal-add.html',
    pipes: [FoodSearchPipe]
})
export class MealAddPage implements OnInit {
    food: Food[];
    meals: any[] = [];
    recipes: Recipe[];
    mealTimeChoose: boolean;
    selectedMeals: any[] = [];
    selectedMealTimes: string[] = [];
    searchQuery: string = '';
    constructor(
        private _foodService: FoodService,
        private _recipeService: RecipeService,
        private params: NavParams,
        public nav: NavController,
        public viewCtrl: ViewController
    ) {
        this._foodService.getFood().subscribe(food => this.food = food);
        this._recipeService.getRecipes().subscribe(recipes => this.recipes = recipes);
        setTimeout(() => {
            this.meals = this.meals.concat(this.recipes, this.food);
            console.log(this.meals);
        }, 2000);
    }

    chooseMealTime(event, meal) {
        let alert = Alert.create();
        alert.setTitle('Meal time');

        alert.addInput({
            type: 'radio',
            label: 'Breakfast',
            value: 'Breakfast'
        });

        alert.addInput({
            type: 'radio',
            label: 'Brunch',
            value: 'Brunch'
        });

        alert.addInput({
            type: 'radio',
            label: 'Lunch',
            value: 'Lunch'
        });

        alert.addInput({
            type: 'radio',
            label: 'Snack',
            value: 'Snack'
        });

        alert.addInput({
            type: 'radio',
            label: 'Dinner',
            value: 'Dinner'
        });

        alert.addButton('Cancel');
        alert.addButton({
            text: 'Ok',
            handler: mealTime => {
                this.mealTimeChoose = false;
                this.selectedMeals.push(meal);
                this.selectedMealTimes.push(mealTime);
            }
        });

        this.nav.present(alert).then(() => {
            this.mealTimeChoose = true;
        });
    }

    doneAdding(): void {
        this.viewCtrl.dismiss(this.selectedMeals, this.selectedMealTimes);
    }

    cancelAdd(): void {
        this.viewCtrl.dismiss();
    }

    ngOnInit() {
        
     }

}