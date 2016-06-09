import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { NutrientDetailsPage } from '../nutrient-details/nutrient-details';
import { INutrient, NutrientSearchPipe, NutrientService } from '../shared';

@Component({
  templateUrl: 'build/pages/nutrients/nutrient-list/nutrient-list.html',
  pipes: [NutrientSearchPipe]
})
export class NutrientListPage {
  micronutrients: any;
  macronutrients: any;
  nutrientGroup: string = "macronutrients";
  searchQuery: string = '';

  constructor(public nav: NavController, private _nutrientService: NutrientService) {
    this.micronutrients = this._nutrientService.getMicronutrients();
    this.macronutrients = this._nutrientService.getMacronutrients();
  }

  openNutrientDetails(nutrient: INutrient): void {
    this.nav.push(NutrientDetailsPage, { nutrient });
  }
}
