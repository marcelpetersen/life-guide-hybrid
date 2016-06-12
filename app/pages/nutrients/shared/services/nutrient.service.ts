import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { INutrient } from '../';
@Injectable()
export class NutrientService {
    micronutrients: FirebaseListObservable<INutrient[]>;
    macronutrients: FirebaseListObservable<INutrient[]>;

    constructor(af: AngularFire) {
        this.micronutrients = af.database.list('/micronutrients');
        this.macronutrients = af.database.list('/macronutrients');
    }

    getMacronutrients(): FirebaseListObservable<INutrient[]> {
        return this.macronutrients;
    }

    getMicronutrients(): FirebaseListObservable<INutrient[]>{
        return this.micronutrients;
    }

}