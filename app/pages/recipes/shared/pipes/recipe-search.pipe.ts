import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'recipeSearch',
    pure: false
})
export class RecipeSearchPipe implements PipeTransform {
    transform(recipes: any[], exponent: any, prop: string): any {
        if (!!recipes) {
            if (prop === 'ingredients') {
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
            } else {
                let filter = exponent.toLocaleLowerCase();
                return filter ? recipes.filter(item => item[prop].toLocaleLowerCase().indexOf(filter) !== -1) : recipes;
            }
        }
    }
}