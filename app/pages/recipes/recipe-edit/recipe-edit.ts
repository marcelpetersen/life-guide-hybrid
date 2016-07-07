import { Component, OnInit } from '@angular/core';
import { CORE_DIRECTIVES, NgForm } from '@angular/common';
import { Alert, Modal, NavController, NavParams, Toast, ViewController } from 'ionic-angular';

import { Food } from '../../food';
import { IngredientSearchPage } from '../ingredient-search/ingredient-search';
import { Recipe, RecipeService } from '../shared';

@Component({
    templateUrl: 'build/pages/recipes/recipe-edit/recipe-edit.html',
    directives: [CORE_DIRECTIVES, NgForm]
})
export class RecipeEditPage implements OnInit {
    public recipe: Recipe;
    public foodSource: Food[];
    public ingredient: Food;
    public recipeSteps: string[] = [];
    constructor(private _nav: NavController, private _params: NavParams, private _viewCtrl: ViewController) { }

    public addStep(): void {
        this.recipeSteps.push('');
        this.recipe.steps.push('');
    }

    public cancelRecipe(): void {
        this._viewCtrl.dismiss();
    }

    public changeQuantity(ingredient: any): void {
        let quantityModal = Alert.create({
            title: `${ingredient.name}`,
            message: "Enter quantity",
            inputs: [
                {
                    name: 'quantity',
                    placeholder: ingredient.hasOwnProperty('chef') ? 'Units' : 'Grams',
                    type: 'number'
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                    handler: () => {
                        console.log('Canceled');
                    }
                },
                {
                    text: 'Save',
                    handler: data => {
                        if (ingredient.hasOwnProperty('chef')) {
                            ingredient.amount = +data.quantity;
                        } else {
                            ingredient.quantity = +data.quantity;
                        }
                    }
                }
            ]
        });
        this._nav.present(quantityModal);
    }

    public createRecipe(): void {
        this.recipeSteps.forEach((step, index) => this.recipe.steps[index] = step);
        if (
            (!!this.recipe.ingredients && !!this.recipe.ingredients.length) &&
            (!!this.recipe.steps && !!this.recipe.steps.length)
        ) {
            this._viewCtrl.dismiss(this.recipe);
        } else {
            const toast = Toast.create({
                message: 'Please complete the entire recipe!',
                showCloseButton: true,
                closeButtonText: 'Ok'
            });
            this._nav.present(toast);
        }
    }

    public removeIngredient(index: number): void {
        this.recipe.ingredients.splice(index, 1);
    }

    public removeStep(index: number): void {
        this.recipeSteps.splice(index, 1);
        this.recipe.steps.splice(index, 1);
    }

    public searchIngredient(): void {
        let ingredientSearchModal = Modal.create(IngredientSearchPage);
        ingredientSearchModal.onDismiss(ingredients => {
            if (!this.recipe.hasOwnProperty('ingredients')) {
                this.recipe.ingredients = [];
            }
            if (!!ingredients) {
                ingredients.forEach(ingredient => {
                    if (ingredient.hasOwnProperty('$key')) {
                        delete ingredient['$key'];
                    }
                    if (this.recipe.ingredients.indexOf(ingredient) === -1) {
                        this.recipe.ingredients.push(ingredient);
                    }
                });
            }
        });
        this._nav.present(ingredientSearchModal);
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