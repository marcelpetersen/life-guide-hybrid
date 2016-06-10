import { Component, OnInit } from '@angular/core';
import { Modal, NavController, ViewController } from 'ionic-angular';

import { IngredientSearchPage } from '../ingredient-search/ingredient-search';
import { Recipe, RecipeService } from '../shared';
import { IFood } from '../../food';

@Component({
    templateUrl: 'build/pages/recipes/recipe-add/recipe-add.html'
})
export class RecipeAddPage implements OnInit {
    recipe: Recipe = new Recipe();
    foodSource: IFood[];
    ingredient: IFood;
    constructor(public nav: NavController, public viewCtrl: ViewController) {}

    searchIngredient() {
        let ingredientSearchModal = Modal.create(IngredientSearchPage, { ingredients: this.recipe.ingredients });
        ingredientSearchModal.onDismiss(ingredients => {
            this.recipe.ingredients = ingredients;
            console.log(this.recipe);
        });
        this.nav.present(ingredientSearchModal);
    }

    dismiss() {
        this.viewCtrl.dismiss(this.recipe);
    }

    ngOnInit() { 
         
    }

}