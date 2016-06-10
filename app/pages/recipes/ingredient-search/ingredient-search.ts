import { Component, OnInit } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

import { IFood, FoodService, FoodSearchPipe } from '../../food';

@Component({
    templateUrl: 'build/pages/recipes/ingredient-search/ingredient-search.html',
    pipes: [FoodSearchPipe]
})
export class IngredientSearchPage implements OnInit {
    checkedIngredients: boolean[] = [];
    foodSource: IFood[];
    selectedIngredients: IFood[] = [];
    searchQuery: string = '';
    constructor(
        private _foodService: FoodService,
        private params: NavParams,
        public viewCtrl: ViewController
        ) {
            if (!!params.data.ingredients) {
                 this.selectedIngredients = params.data.ingredients;
                 this.selectedIngredients.forEach((ingredient, index) => this.checkedIngredients[index] = true);
            }
         }

    addIngredient(event, ingredient, index) {
        this.checkedIngredients[index] = !this.checkedIngredients[index];
        let result = this.selectedIngredients.filter(item => item.name === ingredient.name);
        if (this.checkedIngredients[index] && !result.length) {
            this.selectedIngredients.push(ingredient);
        } else if (!this.checkedIngredients[index] && !!result.length) {
            this.selectedIngredients.splice(this.selectedIngredients.indexOf(result[0]), 1);
        }
        console.log(
            "Checked:", this.checkedIngredients,
            "Ingredient:", ingredient,
            "Selected:", this.selectedIngredients
            );
    }

    dismiss() {
        this.viewCtrl.dismiss(this.selectedIngredients);
    }

    ngOnInit() { 
        this._foodService.getFood().subscribe(food => this.foodSource = food);
    }

}