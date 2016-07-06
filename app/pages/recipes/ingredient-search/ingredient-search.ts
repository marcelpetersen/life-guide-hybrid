import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2';
import { NavParams, ViewController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import { Food, FoodService } from '../../food/shared';
import { ItemSearchPipe } from '../../shared';
import { Recipe, RecipeService } from '../../recipes/shared';

@Component({
    templateUrl: 'build/pages/recipes/ingredient-search/ingredient-search.html',
    pipes: [ItemSearchPipe]
})
export class IngredientSearchPage implements OnInit {
    public food: FirebaseListObservable<Food[]>;
    public recipes: Observable<Recipe[]>;
    public selectedIngredients: any[] = [];
    public searchQuery: string = '';
    constructor(
        private _foodService: FoodService,
        private _params: NavParams,
        private _recipeService: RecipeService,
        private _viewCtrl: ViewController
    ) { }

    public changeIngredient(ingredient: any): void {
        if (!ingredient.hasOwnProperty('quantity')) {
            Object.defineProperty(ingredient, 'quantity', {
                value: 100,
                writable: true,
                enumerable: true,
                configurable: true
            });
        }
        if (!ingredient.hasOwnProperty('amount')) {
            Object.defineProperty(ingredient, 'amount', {
                value: 1,
                writable: true,
                enumerable: true,
                configurable: true
            });
        }
        let ingredientIndex = this.selectedIngredients.indexOf(ingredient);
        if (ingredientIndex !== -1) {
            this.selectedIngredients.splice(ingredientIndex, 1);
        } else {
            this.selectedIngredients.push(ingredient);
        }
    }

    public doneAdding(): void {
        this._viewCtrl.dismiss(this.selectedIngredients);
    }

    public cancelAdd(): void {
        this._viewCtrl.dismiss();
    }

    ngOnInit(): void {
        this.food = this._foodService.getFood();
        this.recipes = this._recipeService.getAllRecipes();
        if (!!this._params.data.ingredients) {
            this.selectedIngredients = this._params.data.ingredients;
        }
    }

}