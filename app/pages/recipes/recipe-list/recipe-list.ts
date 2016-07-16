import { Component, OnInit } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common'
import { Observable } from 'rxjs/Observable';
import { Modal, NavController } from 'ionic-angular';

import { Food, FoodService } from '../../food';
import { IngredientSearchPage } from '../ingredient-search/ingredient-search';
import { ItemSearchPipe, ItemLimitPipe } from '../../shared';
import { RecipeDetailsPage } from '../recipe-details/recipe-details';
import { RecipeEditPage } from '../recipe-edit/recipe-edit';
import { Recipe, IngredientSearchPipe, RecipeService } from '../shared';

import { NavbarComponent } from '../../../components';

@Component({
  templateUrl: 'build/pages/recipes/recipe-list/recipe-list.html',
  directives: [CORE_DIRECTIVES, NavbarComponent],
  pipes: [IngredientSearchPipe, ItemLimitPipe, ItemSearchPipe]
})
export class RecipeListPage implements OnInit {
  private _ingredients: Food[] | Recipe[] = [];
  private newRecipe: Recipe;
  public allRecipes: Observable<Recipe[]>;
  public ingredientsQuery: any[] = [];
  public limitQuery: number = 10;
  public myRecipes: any;
  public recipeFilter: string = "mine";
  public recipeQuery: string = 'name';
  public searchQuery: any;
  constructor(private _foodService: FoodService, private _nav: NavController, private _recipeService: RecipeService) { }

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
    this.ingredientsQuery.splice(index, 1);
    this.ingredientsQuery = [...this.ingredientsQuery];
  }

  public removeRecipe(recipe: Recipe): void {
    this._recipeService.removeRecipe(recipe);
  }

  public showIngredients(): void {
    setTimeout(() => {
      let ingredientSearchModal = Modal.create(IngredientSearchPage, { ingredients: this._ingredients, noQuantity: true });
      ingredientSearchModal.onDismiss(ingredients => {
        if (!!ingredients) {
          this.ingredientsQuery = ingredients;
        }
      });
      this._nav.present(ingredientSearchModal);
    }, 2000);
  }

  ngOnInit(): void {
    this.myRecipes = this._recipeService.getMyRecipes();
    this.allRecipes = this._recipeService.getAllRecipes();
    this._foodService.getFood().subscribe(food => this._ingredients = food);
    this.allRecipes.subscribe(recipes => this._ingredients = [].concat(recipes, this._ingredients));
  }
}
