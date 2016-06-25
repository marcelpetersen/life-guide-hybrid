import { Component, OnInit } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common'
import { Modal, NavController } from 'ionic-angular';

import { ItemSearchPipe } from '../../shared';
import { RecipeDetailsPage } from '../recipe-details/recipe-details';
import { RecipeEditPage } from '../recipe-edit/recipe-edit';
import { Recipe, RecipeService } from '../shared';

import { NavbarComponent } from '../../../components';

@Component({
  templateUrl: 'build/pages/recipes/recipe-list/recipe-list.html',
  directives: [CORE_DIRECTIVES, NavbarComponent],
  pipes: [ItemSearchPipe]
})
export class RecipeListPage implements OnInit {
  public allRecipes: Recipe[] = [];
  private newRecipe: Recipe;
  public myRecipes: any;
  public recipeFilter: string = "mine";
  public searchQuery: string = '';
  constructor(private _nav: NavController, private _recipeService: RecipeService) { }

  public createRecipe(): void {
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

  public openRecipeDetails(recipe: Recipe): void {
    this._nav.push(RecipeDetailsPage, { recipe });
  }

  public editRecipe(recipe: Recipe): void {
    let recipeEditModal = Modal.create(RecipeEditPage, { recipe });
    recipeEditModal.onDismiss(recipe => {
      if (!!recipe) {
        recipe.nutrients = this._recipeService.calculateRecipeNutrition(recipe);
        this._recipeService.updateRecipe(recipe);
      }
    });
    this._nav.present(recipeEditModal);
  }

  public removeRecipe(recipe: Recipe): void {
    this._recipeService.removeRecipe(recipe);
  }

  ngOnInit(): void {
    this.myRecipes = this._recipeService.getMyRecipes();
    this._recipeService.getAllRecipes().subscribe(users => users.map(userRecipes => {
      if (!!userRecipes) {
        for (let recipeKey in userRecipes) {
          let recipe = userRecipes[recipeKey],
            recipeIndex = this.allRecipes.indexOf(recipe);
          if (recipeIndex !== -1) {
            this.allRecipes.splice(recipeIndex, 1);
          }
          this.allRecipes.push(recipe);
        }
      }
    }));
  }


}
