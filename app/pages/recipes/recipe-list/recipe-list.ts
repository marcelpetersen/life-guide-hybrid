import { Component, OnInit } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common'
import { Observable } from 'rxjs/Observable';
import { Modal, NavController } from 'ionic-angular';

import { IngredientSearchPage } from '../ingredient-search/ingredient-search';
import { ItemLimitPipe } from '../../shared';
import { RecipeDetailsPage } from '../recipe-details/recipe-details';
import { RecipeEditPage } from '../recipe-edit/recipe-edit';
import { Recipe, RecipeSearchPipe, RecipeService } from '../shared';

import { NavbarComponent } from '../../../components';

@Component({
  templateUrl: 'build/pages/recipes/recipe-list/recipe-list.html',
  directives: [CORE_DIRECTIVES, NavbarComponent],
  pipes: [ItemLimitPipe, RecipeSearchPipe]
})
export class RecipeListPage implements OnInit {
  private newRecipe: Recipe;
  public allRecipes: Observable<Recipe[]>;
  public limitQuery: number = 10;
  public myRecipes: any;
  public recipeFilter: string = "mine";
  public recipeQuery: string = 'name';
  public searchQuery: any;
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

  public filterRecipes(event): void {
    this.searchQuery = event;
  }

  public loadMore(infiniteScroll) {
    setTimeout(() => {
      this.limitQuery += 5;
      infiniteScroll.complete();
    }, 500);
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

  public removeIngredientQ(index: number): void {
    this.searchQuery.splice(index, 1);
    this.searchQuery = [...this.searchQuery];
    console.log(this.searchQuery);
  }

  public removeRecipe(recipe: Recipe): void {
    this._recipeService.removeRecipe(recipe);
  }

  public showIngredients(): void {
    let ingredientSearchModal = Modal.create(IngredientSearchPage, { noQuantity: true });
    ingredientSearchModal.onDismiss(ingredients => {
      if (!!ingredients) {
        this.recipeQuery = 'ingredients';
        this.searchQuery = ingredients;
      }
    });
    this._nav.present(ingredientSearchModal);
  }

  ngOnInit(): void {
    this.myRecipes = this._recipeService.getMyRecipes();
    this.allRecipes = this._recipeService.getAllRecipes();
    //this.allRecipes.retryWhen(error => error.delay(2000));
    //this.myRecipes.retryWhen(error => error.delay(2000));
  }


}
