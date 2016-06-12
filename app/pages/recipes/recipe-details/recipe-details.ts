import { Component, OnInit } from '@angular/core';
import { NavParams } from 'ionic-angular';

import { NutritionTablesComponent } from '../../../components';
import { Recipe, RecipeService } from '../shared';

@Component({
    templateUrl: 'build/pages/recipes/recipe-details/recipe-details.html',
    directives: [NutritionTablesComponent]
})
export class RecipeDetailsPage implements OnInit {
    recipe: Recipe;
    constructor(public params: NavParams) {
        this.recipe = params.data.recipe;
        console.log(this.recipe);
    }

    ngOnInit(): void { }

}