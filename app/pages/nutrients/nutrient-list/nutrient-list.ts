import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ItemSearchPipe } from '../../shared';
import { NutrientDetailsPage } from '../nutrient-details/nutrient-details';
import { INutrient, NutrientService } from '../shared';

@Component({
  templateUrl: 'build/pages/nutrients/nutrient-list/nutrient-list.html',
  pipes: [ItemSearchPipe]
})
export class NutrientListPage implements OnInit {
  micronutrients: any;
  macronutrients: any;
  nutrientGroup: string = "macronutrients";
  searchQuery: string = '';
  constructor(private _nav: NavController, private _nutrientService: NutrientService) { }

  openNutrientDetails(nutrient: INutrient): void {
    this._nav.push(NutrientDetailsPage, { nutrient });
  }

  ngOnInit(): void {
    this.micronutrients = this._nutrientService.getMicronutrients();
    this.macronutrients = this._nutrientService.getMacronutrients();
  }
}
