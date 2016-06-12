import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { MealPlans } from './meal-plans.model';

@Injectable()
export class MealPlansService {
    mealPlans: FirebaseListObservable<MealPlans>;
    constructor(af: AngularFire) {
        this.mealPlans = af.database.list('/meal-plans');
     }

     getMealPlans(): FirebaseListObservable<MealPlans> {
        return this.mealPlans;
     }

}