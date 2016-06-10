import { Component, OnInit } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { MATERIAL_DIRECTIVES } from 'ng2-material';

import { INutrient, NutrientService } from '../shared';

@Component({
    templateUrl: 'build/pages/nutrients/nutrient-details/nutrient-details.html',
    directives: [MATERIAL_DIRECTIVES]
})
export class NutrientDetailsPage implements OnInit {
    nutrient: INutrient;
    intakeUnit: string;
    constructor(params: NavParams) { 
        this.nutrient = params.data.nutrient;
        this.intakeUnit = (this.nutrient.category === 'Vitamin' || this.nutrient.category === 'Mineral') ? 'mg' : 'g';
    }

    ngOnInit() {

    }

}