import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FirebaseListObservable } from 'angularfire2';

import { ItemLimitPipe, ItemSearchPipe } from '../../shared';
import { NavbarComponent } from '../../../components';
import { NutrientDetailsPage } from '../nutrient-details/nutrient-details';
import { INutrient, NutrientService } from '../shared';

@Component({
  templateUrl: 'build/pages/nutrients/nutrient-list/nutrient-list.html',
  directives: [NavbarComponent],
  pipes: [ItemLimitPipe, ItemSearchPipe]
})
export class NutrientListPage implements OnInit {
  public limitQuery: number = 10;
  public micronutrients: FirebaseListObservable<INutrient[]>;
  public macronutrients: FirebaseListObservable<INutrient[]>;
  public nutrientGroup: string = "macronutrients";
  public searchQuery: string = '';
  constructor(private _nav: NavController, private _nutrientService: NutrientService) { }

  public filterNutrient(event): void {
    this.searchQuery = event;
  }

  public loadMore(infiniteScroll) {
    setTimeout(() => {
      this.limitQuery += 5;
      infiniteScroll.complete();
    }, 500);
  }

  public openNutrientDetails(nutrient: INutrient): void {
    this._nav.push(NutrientDetailsPage, { nutrient });
  }

  ngOnInit(): void {
    this.micronutrients = this._nutrientService.getMicronutrients();
    this.macronutrients = this._nutrientService.getMacronutrients();
  }
}
