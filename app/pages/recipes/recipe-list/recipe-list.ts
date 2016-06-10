import { Component } from '@angular/core';
import { Modal, NavController } from 'ionic-angular';

import { RecipeAddPage } from '../recipe-add/recipe-add';
import { Recipe, RecipeService } from '../shared';

@Component({
  templateUrl: 'build/pages/recipes/recipe-list/recipe-list.html',
})
export class RecipeListPage {
  newRecipe: Recipe;
  recipes: any;
  searchQuery: string = '';
  constructor(public nav: NavController) { }

  createRecipe() {
    this.newRecipe = new Recipe();
    let recipeAddModal = Modal.create(RecipeAddPage, { recipe: this.newRecipe });
    recipeAddModal.onDismiss(data => {
      console.log(data);
    });
    this.nav.present(recipeAddModal);
  }
}
