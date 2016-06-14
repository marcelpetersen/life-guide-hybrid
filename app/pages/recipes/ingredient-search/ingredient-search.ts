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
        private _params: NavParams,
        private _viewCtrl: ViewController
    ) { }

    addIngredient(ingredient: Food): void {
        this.checkedIngredients[ingredient['$key']] = !this.checkedIngredients[ingredient['$key']];
        let result = this.selectedIngredients.filter(item => item.name === ingredient.name);
        if (this.checkedIngredients[ingredient['$key']] && !result.length) {
            let newIngredient: Food = new Food(
                ingredient['$key'],
                ingredient.name,
                ingredient.category,
                ingredient.energy,
                ingredient.macronutrients,
                ingredient.minerals,
                ingredient.vitamins,
                ingredient['amino acids'],
                ingredient.flavonoids,
                ingredient.sterols,
                ingredient.other
            );
            this.selectedIngredients.push(newIngredient);
        } else if (!this.checkedIngredients[ingredient['$key']] && !!result.length) {
            this.selectedIngredients.splice(this.selectedIngredients.indexOf(result[0]), 1);
        }
    }

    doneAdding(): void {
        this._viewCtrl.dismiss(this.selectedIngredients);
    }

    cancelAdd(): void {
        this._viewCtrl.dismiss();
    }

    ngOnInit(): void {
        this._foodService.getFood().subscribe(food => this.foodSource = food);
        if (!!this._params.data.ingredients) {
            this.selectedIngredients = this._params.data.ingredients;
            this.selectedIngredients.forEach(ingredient => this.checkedIngredients[ingredient.key] = true);
        }
    }

}