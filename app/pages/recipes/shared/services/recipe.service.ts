import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Injectable()
export class RecipeService {
    recipes: FirebaseListObservable<any[]>;

    constructor(af: AngularFire) {
        this.recipes = af.database.list('/recipes');
    }

    getRecipes(): FirebaseListObservable<any[]> {
        return this.recipes;
    }
}