import { Component, OnInit } from '@angular/core';
import { Alert, NavController } from 'ionic-angular';
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
  public searchFilter: string = "name";
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

  public setFilterOpts(): void {
    let filterAlert = Alert.create({
      title: "Nutrient search filter",
      inputs: [
        {
          type: 'radio',
          label: 'Name',
          value: 'name',
          checked: true
        }, {
          type: 'radio',
          label: 'Description',
          value: 'description'
        }, {
          type: 'radio',
          label: 'Functions',
          value: 'functions'
        }, {
          type: 'radio',
          label: 'Disease preventions',
          value: 'disease prevention'
        }, {
          type: 'radio',
          label: 'Deficiency',
          value: 'deficiency'
        }, {
          type: 'radio',
          label: 'Toxicity',
          value: 'toxicity'
        }, {
          type: 'radio',
          label: 'Relationship with other nutrients',
          value: 'relationship with other nutrients'
        }
      ],
      buttons: [
        {
          text: 'Cancel'
        }, {
          text: 'OK',
          handler: data => {
            this.searchFilter = data;
            console.log(data)
          }
        }
      ]
    });
    this._nav.present(filterAlert);
  }

  ngOnInit(): void {
    this.micronutrients = this._nutrientService.getMicronutrients();
    this.macronutrients = this._nutrientService.getMacronutrients();
  }
}
