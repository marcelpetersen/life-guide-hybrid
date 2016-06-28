import { Injectable } from '@angular/core';
import { AngularFire, FirebaseAuth, FirebaseListObservable } from 'angularfire2';

import { Food } from '../../../food';
import { Recipe } from '../';

@Injectable()
export class RecipeService {
    private _allRecipes: FirebaseListObservable<Recipe[]>;
    private _userRecipes: FirebaseListObservable<Recipe[]>;
    constructor(private _af: AngularFire, private _auth: FirebaseAuth) {
        this._allRecipes = _af.database.list('/recipes');
        this._auth.subscribe(authData => {
            if (authData) {
                this._userRecipes = _af.database.list(`/recipes/${authData.uid}`);
            }
        });
    }

    public getAllRecipes(): any {
        return new Promise(resolve => {
            this._allRecipes.subscribe(users => users.map(userRecipes => {
                let allRecipes: Recipe[] = [];
                if (!!userRecipes) {
                    for (let recipeKey in userRecipes) {
                        let recipe = userRecipes[recipeKey];
                        if (recipe.ingredients) {
                            allRecipes.push(recipe);
                        }
                    }
                    resolve(allRecipes);
                }
            }));
        });
    }

    public getMyRecipes(): FirebaseListObservable<Recipe[]> {
        return this._userRecipes;
    }

    public addRecipe(recipe: Recipe): void {
        this._userRecipes.push(recipe);
    }

    public updateRecipe(recipe: Recipe): void {
        this._userRecipes.update(recipe['$key'], {
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
        this._userRecipes.remove(recipe['$key']);
    }

    public calculateRecipeNutrition(recipe: Recipe): Food {
        let nutrition: Food = new Food();
        recipe.ingredients.forEach(ingredient => {
            for (let nutrientCategory in ingredient) {
                let nutrients = ingredient[nutrientCategory];
                ingredient.quantity = ingredient.quantity || 100;
                if (nutrientCategory === 'energy') {
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
            if (nutrientCategory === 'energy') {
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