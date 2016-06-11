import { Component } from '@angular/core';
import { Modal, NavController } from 'ionic-angular';

import { Food } from '../../food';
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

  createRecipe(): void {
    this.newRecipe = new Recipe();
    let recipeAddModal = Modal.create(RecipeAddPage, { recipe: this.newRecipe });
    recipeAddModal.onDismiss(recipe => {
      if (!!recipe) {
        recipe.nutrients = this.calculateNutrition(recipe);
        console.log(recipe);
      }
    });
    this.nav.present(recipeAddModal);
  }

  calculateNutrition(recipe: Recipe): Food {
    let nutrition: Food = new Food();
    nutrition.name = recipe.name;
    nutrition.category = recipe.category;
    nutrition.quantity = 0;
    recipe.ingredients.forEach(ingredient => {
      for (let nutrientCategory in ingredient) {
        let nutrients = ingredient[nutrientCategory];
        ingredient.quantity = ingredient.quantity || 100;
        if (Number.isFinite(nutrients)) {
          nutrition[nutrientCategory] += +nutrients * (+ingredient.quantity / 100);
        }
        for (let nutrient in nutrients) {
          if (nutrition.hasOwnProperty(nutrientCategory)
            && nutrition[nutrientCategory].hasOwnProperty(nutrient)) {
            nutrition[nutrientCategory][nutrient] += +nutrients[nutrient] * (+ingredient.quantity / 100);

          }
        }
      }
      nutrition.quantity += +ingredient.quantity;
    });
    for (let nutrientCategory in nutrition) {
      let nutrients = nutrition[nutrientCategory];
      if (Number.isFinite(nutrients)) {
        nutrition[nutrientCategory] = Math.floor(+nutrition[nutrientCategory] / +recipe.servings);
      }
      for (let nutrient in nutrients) {
        nutrition[nutrientCategory][nutrient] = (+nutrition[nutrientCategory][nutrient] / +recipe.servings).toFixed(2);
      }
    }
    return nutrition;
  }
}
