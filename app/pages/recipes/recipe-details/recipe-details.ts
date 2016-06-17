import { Component, OnInit } from '@angular/core';
import { NavParams } from 'ionic-angular';

import { NutritionTablesComponent } from '../../../components';
import { Recipe, RecipeService } from '../shared';

@Component({
    templateUrl: 'build/pages/recipes/recipe-details/recipe-details.html',
    directives: [NutritionTablesComponent]
})
export class RecipeDetailsPage implements OnInit {
    public recipe: Recipe;
    constructor(private _params: NavParams) { }

    ngOnInit(): void { 
        this.recipe = this._params.data.recipe;
    }

}