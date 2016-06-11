import { Component } from '@angular/core';
import { Modal, NavController, ViewController } from 'ionic-angular';

import { IngredientSearchPage } from '../ingredient-search/ingredient-search';
import { Recipe, RecipeService } from '../shared';
import { Food } from '../../food';

@Component({
    templateUrl: 'build/pages/recipes/recipe-add/recipe-add.html'
})
export class RecipeAddPage {
    recipe: Recipe = new Recipe();
    foodSource: Food[];
    ingredient: Food;
    constructor(public nav: NavController, public viewCtrl: ViewController) { }

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