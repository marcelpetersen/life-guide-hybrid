import { Component, OnInit } from '@angular/core';
import { Modal, NavController } from 'ionic-angular';

import { FoodSearchPipe } from '../../food'
import { RecipeDetailsPage } from '../recipe-details/recipe-details';
import { RecipeEditPage } from '../recipe-edit/recipe-edit';
import { Recipe, RecipeService } from '../shared';

@Component({
  templateUrl: 'build/pages/recipes/recipe-list/recipe-list.html',
  pipes: [FoodSearchPipe]
})
export class RecipeListPage implements OnInit {
  newRecipe: Recipe;
  recipes: any;
  searchQuery: string = '';
  constructor(private _nav: NavController, private _recipeService: RecipeService) { }

  createRecipe(): void {
    this.newRecipe = new Recipe();
    let recipeAddModal = Modal.create(RecipeEditPage, { recipe: this.newRecipe });
    recipeAddModal.onDismiss(recipe => {
      if (!!recipe) {
        recipe.nutrients = this._recipeService.calculateRecipeNutrition(recipe);
        this._recipeService.addRecipe(recipe);
      }
    });
    this._nav.present(recipeAddModal);
  }

  openRecipeDetails(recipe: Recipe): void {
    this._nav.push(RecipeDetailsPage, { recipe });
  }

  editRecipe(recipe: Recipe): void {
    let recipeEditModal = Modal.create(RecipeEditPage, { recipe });
    recipeEditModal.onDismiss(recipe => {
      if (!!recipe) {
        recipe.nutrients = this._recipeService.calculateRecipeNutrition(recipe);
        this._recipeService.updateRecipe(recipe);
      }
    });
    this._nav.present(recipeEditModal);
  }

  removeRecipe(recipe: Recipe): void {
    this._recipeService.removeRecipe(recipe);
  }

  ngOnInit(): void {
    this.recipes = this._recipeService.getRecipes();
  }

  
}
