import { Component, OnInit } from '@angular/core';
import { Modal, NavController, NavParams, ViewController } from 'ionic-angular';

import { Food } from '../../food';
import { IngredientSearchPage } from '../ingredient-search/ingredient-search';
import { Recipe, RecipeService } from '../shared';

@Component({
    templateUrl: 'build/pages/recipes/recipe-edit/recipe-edit.html'
})
export class RecipeEditPage implements OnInit {
    recipe: Recipe;
    foodSource: Food[];
    ingredient: Food;
    constructor(private _nav: NavController, private _params: NavParams, private _viewCtrl: ViewController) { }

    searchIngredient(): void {
        let ingredientSearchModal = Modal.create(IngredientSearchPage, { ingredients: this.recipe.ingredients });
        ingredientSearchModal.onDismiss(ingredients => this.recipe.ingredients = ingredients);
        this._nav.present(ingredientSearchModal);
    }

    createRecipe(): void {
        this._viewCtrl.dismiss(this.recipe);
    }

    cancelRecipe(): void {
        this._viewCtrl.dismiss();
    }

    ngOnInit(): void {
        this.recipe = this._params.data.recipe;
    }

}