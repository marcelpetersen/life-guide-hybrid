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
    recipeSteps: string[] = [];
    constructor(private _nav: NavController, private _params: NavParams, private _viewCtrl: ViewController) { }

    searchIngredient(): void {
        let ingredientSearchModal = Modal.create(IngredientSearchPage, { ingredients: this.recipe.ingredients });
        ingredientSearchModal.onDismiss(ingredients => this.recipe.ingredients = ingredients);
        this._nav.present(ingredientSearchModal);
    }

    addStep(): void {
        this.recipeSteps.push('');
        this.recipe.steps.push('');
    }

    removeIngredient(index: number): void {
        this.recipe.ingredients.splice(index, 1);
    }

    removeStep(index: number): void {
        this.recipeSteps.splice(index, 1);
        this.recipe.steps.splice(index, 1);
    }

    createRecipe(): void {
        this.recipeSteps.forEach((step, index) => this.recipe.steps[index] = step);
        this._viewCtrl.dismiss(this.recipe);
    }

    cancelRecipe(): void {
        this._viewCtrl.dismiss();
    }

    ngOnInit(): void {
        this.recipe = this._params.data.recipe;
        if (this.recipe.steps) {
            this.recipe.steps.forEach((step, index) => this.recipeSteps[index] = step);
        } else {
            this.recipe.steps = [];
        }
    }

}