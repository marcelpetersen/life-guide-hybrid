import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { AuthenticationService } from '../../../authentication';
import { Food } from '../../../food';
import { Recipe } from '../';

@Injectable()
export class RecipeService {
    private _recipes: FirebaseListObservable<Recipe[]>;

    constructor(private _af: AngularFire, private _authService: AuthenticationService) {
        this._authService.getAuth().subscribe(authData => {
            if (authData) {
                this._recipes = _af.database.list(`/recipes/${authData.uid}`);
            }
        });
    }

    public getRecipes(): FirebaseListObservable<Recipe[]> {
        return this._recipes;
    }

    public addRecipe(recipe: Recipe): void {
        this._recipes.push(recipe);
    }

    public updateRecipe(recipe: Recipe): void {
        this._recipes.update(recipe['$key'], {
            name: recipe.name,
            category: recipe.category,
            dietary: recipe.dietary,
            chef: recipe.chef,
            ingredients: recipe.ingredients,
            prepTime: recipe.prepTime,
            cookMethod: recipe.cookMethod,
            cookTime: recipe.cookTime,
            cookTemperature: recipe.cookTemperature,
            nutrients: recipe.nutrients,
            servings: recipe.servings,
            steps: recipe.steps,
            quantity: recipe.quantity
        });
    }

    public removeRecipe(recipe: Recipe): void {
        this._recipes.remove(recipe['$key']);
    }

    public calculateRecipeNutrition(recipe: Recipe): Food {
        let nutrition: Food = new Food();
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
            recipe.quantity += +ingredient.quantity;
        });
        for (let nutrientCategory in nutrition) {
            let nutrients = nutrition[nutrientCategory];
            if (Number.isFinite(nutrients)) {
                nutrition[nutrientCategory] /= +recipe.servings;
            }
            for (let nutrient in nutrients) {
                nutrition[nutrientCategory][nutrient] /= +recipe.servings;
            }
        }
        recipe.quantity /= +recipe.servings;
        return nutrition;
    }
}