import { Component, OnInit } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

import { Food, FoodService, FoodSearchPipe } from '../../food';

@Component({
    templateUrl: 'build/pages/recipes/ingredient-search/ingredient-search.html',
    pipes: [FoodSearchPipe]
})
export class IngredientSearchPage implements OnInit {
    checkedIngredients: boolean[] = [];
    foodSource: Food[];
    selectedIngredients: Food[] = [];
    searchQuery: string = '';
    constructor(
        private _foodService: FoodService,
        private params: NavParams,
        public viewCtrl: ViewController
        ) {
            if (!!params.data.ingredients) {
                 this.selectedIngredients = params.data.ingredients;
                 this.selectedIngredients.forEach(ingredient => this.checkedIngredients[ingredient['$key']] = true);
            }
         }

    addIngredient(event: any, ingredient: Food): void {
        this.checkedIngredients[ingredient['$key']] = !this.checkedIngredients[ingredient['$key']];
        let result = this.selectedIngredients.filter(item => item.name === ingredient.name);
        if (this.checkedIngredients[ingredient['$key']] && !result.length) {
            this.selectedIngredients.push(ingredient);
        } else if (!this.checkedIngredients[ingredient['$key']] && !!result.length) {
            this.selectedIngredients.splice(this.selectedIngredients.indexOf(result[0]), 1);
        }
        console.log(
            "Checked:", this.checkedIngredients,
            "Ingredient:", ingredient,
            "Selected:", this.selectedIngredients
            );
    }

    doneAdding(): void {
        this.viewCtrl.dismiss(this.selectedIngredients);
    }

    cancelAdd(): void {
        this.viewCtrl.dismiss();
    }

    ngOnInit(): void { 
        this._foodService.getFood().subscribe(food => this.foodSource = food);
    }

}