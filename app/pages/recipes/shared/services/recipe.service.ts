import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { Food } from '../../../food';
import { Recipe } from '../';

@Injectable()
export class RecipeService {
    recipes: FirebaseListObservable<any[]>;

    constructor(af: AngularFire) {
        this.recipes = af.database.list('/recipes');
    }

    getRecipes(): FirebaseListObservable<any[]> {
        return this.recipes;
    }

    addRecipe(recipe: Recipe): void {
        this.recipes.push(recipe);
    }

    updateRecipe(recipe: Recipe): void {
        this.recipes.update(recipe['$key'], recipe);
    }

    removeRecipe(recipe: Recipe): void {
        this.recipes.remove(recipe['$key']);
    }

    calculateRecipeNutrition(recipe: Recipe): Food {
        let nutrition: Food = new Food();
        nutrition.quantity = recipe.quantity;
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