import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ItemSearchPipe } from '../../shared';
import { NavbarComponent } from '../../../components';
import { NutrientDetailsPage } from '../nutrient-details/nutrient-details';
import { INutrient, NutrientService } from '../shared';

@Component({
  templateUrl: 'build/pages/nutrients/nutrient-list/nutrient-list.html',
  directives: [NavbarComponent],
  pipes: [ItemSearchPipe]
})
export class NutrientListPage implements OnInit {
  public micronutrients: any;
  public macronutrients: any;
  public nutrientGroup: string = "macronutrients";
  public searchQuery: string = '';
  constructor(private _nav: NavController, private _nutrientService: NutrientService) { }

  public openNutrientDetails(nutrient: INutrient): void {
    this._nav.push(NutrientDetailsPage, { nutrient });
  }

  ngOnInit(): void {
    this.micronutrients = this._nutrientService.getMicronutrients();
    this.macronutrients = this._nutrientService.getMacronutrients();
  }
}
