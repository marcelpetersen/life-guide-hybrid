import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { MealPlan } from '../model/meal-plan.model';

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
    this.mealPlans.push(new MealPlan(date));
  }

  updateMealPlan(mealPlan: MealPlan): void {
    if (mealPlan['$key']) {
      this.mealPlans.update(mealPlan['$key'], {
        meals: mealPlan.meals
      });
    }

  }
}