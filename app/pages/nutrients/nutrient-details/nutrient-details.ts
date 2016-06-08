import { Component, OnInit } from '@angular/core';
import { NavParams } from 'ionic-angular';

import { INutrient, NutrientService } from '../shared';

@Component({
    templateUrl: 'build/pages/nutrients/nutrient-details/nutrient-details.html'
})
export class NutrientDetailsPage implements OnInit {
    nutrient: INutrient;
    constructor(params: NavParams) { 
        this.nutrient = params.data.nutrient;
    }

    ngOnInit() { }

}