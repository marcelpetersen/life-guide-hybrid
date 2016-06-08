import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FirebaseListObservable } from 'angularfire2';

import { NutrientService } from '../shared';

@Component({
  templateUrl: 'build/pages/nutrients/nutrient-list/nutrient-list.html',
})
export class NutrientListPage{
  micronutrients: FirebaseListObservable<any[]>;
  macronutrients: FirebaseListObservable<any[]>;
  constructor(public nav: NavController, private _nutrientService: NutrientService) {
    this.micronutrients = this._nutrientService.getMicronutrients();
    this.macronutrients = this._nutrientService.getMacronutrients();
  }
}
