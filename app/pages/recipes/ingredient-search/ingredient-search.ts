import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2';
import { Alert, NavController, NavParams, ViewController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import { Food, FoodService } from '../../food/shared';
import { ItemSearchPipe } from '../../shared';
import { Recipe, RecipeService } from '../../recipes/shared';

@Component({
    templateUrl: 'build/pages/recipes/ingredient-search/ingredient-search.html',
    pipes: [ItemSearchPipe]
})
export class IngredientSearchPage implements OnInit {
    public food: FirebaseListObservable<Food[]>;
    public recipes: Observable<Recipe[]>;
    public selectedIngredients: any[] = [];
    public searchQuery: string = '';
    constructor(
        private _foodService: FoodService,
        private _nav: NavController,
        private _params: NavParams,
        private _recipeService: RecipeService,
        private _viewCtrl: ViewController
    ) { }

    public cancelAdd(): void {
        this._viewCtrl.dismiss();
    }

    public doneAdding(): void {
        this._viewCtrl.dismiss(this.selectedIngredients);
    }

    public setIngredient(ingredient: any): void {
        if (ingredient.checked) {
            this.selectedIngredients.splice(this.selectedIngredients.indexOf(ingredient), 1);
        } else {
            if (!ingredient.hasOwnProperty('quantity')) {
                Object.defineProperty(ingredient, 'quantity', {
                    value: 100,
                    writable: true,
                    enumerable: true,
                    configurable: true
                });
            }
            if (!ingredient.hasOwnProperty('amount')) {
                Object.defineProperty(ingredient, 'amount', {
                    value: 1,
                    writable: true,
                    enumerable: true,
                    configurable: true
                });
            }
            let quantityModal = Alert.create({
                title: `${ingredient.name}`,
                message: "Enter quantity",
                inputs: [
                    {
                        name: 'quantity',
                        placeholder: ingredient.hasOwnProperty('chef') ? 'Units' : 'Grams',
                        type: 'number'
                    },
                ],
                buttons: [
                    {
                        text: 'Cancel',
                        handler: () => {
                            ingredient.checked = false;
                        }
                    },
                    {
                        text: 'Save',
                        handler: data => {
                            if (!!data.quantity) {
                                if (ingredient.hasOwnProperty('chef')) {
                                    ingredient.amount = +data.quantity;
                                } else {
                                    ingredient.quantity = +data.quantity;
                                }
                                this.selectedIngredients.push(ingredient);
                            } else {
                                ingredient.checked = false;
                            }
                        }
                    }
                ]
            });
            this._nav.present(quantityModal);
        }
    }

    ngOnInit(): void {
        this.food = this._foodService.getFood();
        this.recipes = this._recipeService.getAllRecipes();
    }

}