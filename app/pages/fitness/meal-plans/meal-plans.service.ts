import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { MealPlan } from './meal-plan.model';

@Injectable()
export class MealPlansService {
    mealPlans: FirebaseListObservable<MealPlan[]>;
    constructor(af: AngularFire) {
        this.mealPlans = af.database.list('/meal-plans');
     }

     getMealPlans(): FirebaseListObservable<MealPlan[]> {
        return this.mealPlans;
     }

     addMealPlan(date: string): void {
       let meals = {
           Breakfast: [],
           Brunch: [],
           Lunch: [],
           Snack: [],
           Dinner: []
          },
          newMP = new MealPlan(date, meals);
       this.mealPlans.push(newMP);
     }

     updateMealPlan(mealPlan: MealPlan): void {
       this.mealPlans.update(mealPlan['$key'], {
         meals: mealPlan.meals
       });
     }
}