import { Component } from '@angular/core';
import { Modal, NavController } from 'ionic-angular';

import { FoodSearchPipe } from '../../food'
import { RecipeDetailsPage } from '../recipe-details/recipe-details';
import { RecipeEditPage } from '../recipe-edit/recipe-edit';
import { Recipe, RecipeService } from '../shared';

@Component({
  templateUrl: 'build/pages/recipes/recipe-list/recipe-list.html',
  pipes: [FoodSearchPipe]
})
export class RecipeListPage {
  newRecipe: Recipe;
  recipes: any;
  searchQuery: string = '';
  constructor(private _recipeService: RecipeService, public nav: NavController) { 
    this.recipes = this._recipeService.getRecipes();
  }

  createRecipe(): void {
    this.newRecipe = new Recipe();
    let recipeAddModal = Modal.create(RecipeEditPage, { recipe: this.newRecipe });
    recipeAddModal.onDismiss(recipe => {
      if (!!recipe) {
        recipe.nutrients = this._recipeService.calculateRecipeNutrition(recipe);
        this._recipeService.addRecipe(recipe);
      }
    });
    this.nav.present(recipeAddModal);
  }

  openRecipeDetails(recipe: Recipe): void {
    this.nav.push(RecipeDetailsPage, { recipe });
  }

  editRecipe(recipe: Recipe): void {
    let recipeEditModal = Modal.create(RecipeEditPage, { recipe });
    recipeEditModal.onDismiss(recipe => {
      if (!!recipe) {
        recipe.nutrients = this._recipeService.calculateRecipeNutrition(recipe);
        this._recipeService.updateRecipe(recipe);
      }
    });
    this.nav.present(recipeEditModal);
  }

  removeRecipe(recipe: Recipe): void {
    this._recipeService.removeRecipe(recipe);
  }

  
}
