import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Injectable()
export class NutrientService {
    micronutrients: FirebaseListObservable<any[]>;
    macronutrients: FirebaseListObservable<any[]>;

    constructor(af: AngularFire) {
        this.micronutrients = af.database.list('/micronutrients');
        this.macronutrients = af.database.list('/macronutrients');
    }

    getMacronutrients(): FirebaseListObservable<any[]> {
        return this.macronutrients;
    }

    getMicronutrients(): FirebaseListObservable<any[]>{
        return this.micronutrients;
    }

}