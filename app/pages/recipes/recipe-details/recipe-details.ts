import { Component, OnInit } from '@angular/core';
import { NavParams } from 'ionic-angular';

import { Recipe, RecipeService } from '../shared';

@Component({
    templateUrl: 'build/pages/recipes/recipe-details/recipe-details.html'
})
export class RecipeDetailsPage implements OnInit {
    recipe: Recipe;
    constructor(params: NavParams) {
        this.recipe = params.data.recipe;
    }

    ngOnInit(): void { }

}