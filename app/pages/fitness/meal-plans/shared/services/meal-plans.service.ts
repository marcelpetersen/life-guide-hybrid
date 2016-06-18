import { Injectable } from '@angular/core';
import { AngularFire, FirebaseAuth, FirebaseListObservable } from 'angularfire2';

import { MealPlan } from '../model/meal-plan.model';

@Injectable()
export class MealPlansService {
  private _mealPlans: FirebaseListObservable<MealPlan[]>;
  constructor(private _af: AngularFire, private _auth: FirebaseAuth) {
    this._auth.subscribe(authData => {
      if (authData) {
        this._mealPlans = _af.database.list(`/meal-plans/${authData.uid}`);
      }
    });
  }

  public getMealPlans(): FirebaseListObservable<MealPlan[]> {
    return this._mealPlans;
  }

  public addMealPlan(date: string): void {
    this._mealPlans.push(new MealPlan(date));
  }

  public updateMealPlan(mealPlan: MealPlan): void {
    if (mealPlan['$key']) {
      this._mealPlans.update(mealPlan['$key'], {
        meals: mealPlan.meals
      });
    }

  }
}