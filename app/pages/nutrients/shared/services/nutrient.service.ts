import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { INutrient } from '../';
@Injectable()
export class NutrientService {
    private _micronutrients: FirebaseListObservable<INutrient[]>;
    private _macronutrients: FirebaseListObservable<INutrient[]>;

    constructor(af: AngularFire) {
        this._micronutrients = af.database.list('/micronutrients');
        this._macronutrients = af.database.list('/macronutrients');
    }

    public getMacronutrients(): FirebaseListObservable<INutrient[]> {
        return this._macronutrients;
    }

    public getMicronutrients(): FirebaseListObservable<INutrient[]>{
        return this._micronutrients;
    }

}