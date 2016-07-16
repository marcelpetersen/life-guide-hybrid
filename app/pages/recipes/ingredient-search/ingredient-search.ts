import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2';
import { Alert, NavController, NavParams, ViewController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import { Food } from '../../food/shared';
import { ItemLimitPipe, ItemSearchPipe } from '../../shared';
import { Recipe } from '../../recipes/shared';

@Component({
    templateUrl: 'build/pages/recipes/ingredient-search/ingredient-search.html',
    pipes: [ItemLimitPipe, ItemSearchPipe]
})
export class IngredientSearchPage implements OnInit {
    public ingredients: Recipe[] | Food[];
    public limitQuery: number = 10;
    public noQuantity: boolean = false;
    public selectedIngredients: any[] = [];
    public searchQuery: string = '';
    constructor(
        private _nav: NavController,
        private _params: NavParams,
        private _viewCtrl: ViewController
    ) { }

    public cancelAdd(): void {
        this._viewCtrl.dismiss();
    }

    public doneAdding(): void {
        this._viewCtrl.dismiss(this.selectedIngredients);
    }

    public loadMore(infiniteScroll) {
        setTimeout(() => {
            this.limitQuery += 5;
            infiniteScroll.complete();
        }, 500);
    }

    public setIngredient(ingredient: any, checkEl: any): void {
        let idx = this.selectedIngredients.indexOf(ingredient);
        if (idx >= 0) {
            this.selectedIngredients.splice(idx, 1);
        } else if (!this.noQuantity) {
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
                            checkEl.checked = false;
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
                                checkEl.checked = false;
                            }
                        }
                    }
                ]
            });
            this._nav.present(quantityModal);
        } else {
            this.selectedIngredients.push(ingredient);
        }
    }

    ngOnInit(): void {
        this.ingredients = this._params.data.ingredients;
        if (this._params.data.noQuantity) {
            this.noQuantity = true;
        }
        if (this._params.data.selected) {
            this.selectedIngredients = this._params.data.selected;
        }
    }
}