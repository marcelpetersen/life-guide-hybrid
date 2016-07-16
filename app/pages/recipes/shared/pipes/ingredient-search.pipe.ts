import { Pipe, PipeTransform } from '@angular/core';

import { Recipe } from '../model/recipe.model';

@Pipe({
    name: 'ingredientSearch'
})
export class IngredientSearchPipe implements PipeTransform {
    transform(recipes: Recipe[], exponent: any[]): any {
        if (!!recipes && !!recipes.length) {
            return exponent.length ? recipes.filter(recipe => {
                let found = 0;
                recipe.ingredients.forEach(ingredient => {
                    exponent.forEach(element => {
                        if (ingredient.name === element.name) {
                            found++;
                        }
                    });
                });
                return found === exponent.length;
            }) : recipes;
        }
    }
}