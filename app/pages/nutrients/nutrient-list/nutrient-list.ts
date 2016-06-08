import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { NutrientDetailsPage } from '../nutrient-details/nutrient-details';
import { INutrient, NutrientService } from '../shared';

@Component({
  templateUrl: 'build/pages/nutrients/nutrient-list/nutrient-list.html',
})
export class NutrientListPage{
  micronutrients: any;
  macronutrients: any;
  constructor(public nav: NavController, private _nutrientService: NutrientService) {
    this.micronutrients = this._nutrientService.getMicronutrients();
    this.macronutrients = this._nutrientService.getMacronutrients();
  }
  openNutrientDetails(nutrient: INutrient): void {
    this.nav.push(NutrientDetailsPage, { nutrient });
  }
}
