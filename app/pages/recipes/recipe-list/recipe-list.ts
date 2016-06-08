import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import { FirebaseListObservable } from 'angularfire2';

import { RecipeService } from '../shared';

@Component({
  templateUrl: 'build/pages/recipes/recipe-list/recipe-list.html',
})
export class RecipeListPage {
  recipes: FirebaseListObservable<any[]>;
  constructor(public nav: NavController) {}
}
