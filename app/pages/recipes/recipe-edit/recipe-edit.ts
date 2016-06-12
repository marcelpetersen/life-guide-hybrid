import { Component } from '@angular/core';
import { Modal, NavController, NavParams, ViewController } from 'ionic-angular';

import { IngredientSearchPage } from '../ingredient-search/ingredient-search';
import { Recipe, RecipeService } from '../shared';
import { Food } from '../../food';

@Component({
    templateUrl: 'build/pages/recipes/recipe-edit/recipe-edit.html'
})
export class RecipeEditPage {
    recipe: Recipe;
    foodSource: Food[];
    ingredient: Food;
    constructor(public nav: NavController, public params: NavParams, public viewCtrl: ViewController) { 
        this.recipe = params.data.recipe;
    }

    searchIngredient(): void {
        let ingredientSearchModal = Modal.create(IngredientSearchPage, { ingredients: this.recipe.ingredients });
        ingredientSearchModal.onDismiss(ingredients => this.recipe.ingredients = ingredients);
        this.nav.present(ingredientSearchModal);
    }

    createRecipe(): void {
        this.viewCtrl.dismiss(this.recipe);
    }

    cancelRecipe(): void {
        this.viewCtrl.dismiss();
    }

}