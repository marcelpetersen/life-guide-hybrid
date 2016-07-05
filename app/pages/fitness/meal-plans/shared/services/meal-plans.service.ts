import { Injectable } from '@angular/core';
import { AngularFire, FirebaseAuth, FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

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

  public addMealPlan(mealPlan: MealPlan): void {
    this._mealPlans.push(mealPlan);
  }

  public updateMealPlan(mealPlan: MealPlan): void {
    if (mealPlan['$key']) {
      this._mealPlans.update(mealPlan['$key'], {
        date: mealPlan.date,
        breakfast: mealPlan.breakfast,
        brunch: mealPlan.brunch,
        lunch: mealPlan.lunch,
        snack: mealPlan.snack,
        dinner: mealPlan.dinner,
        numericIntake: mealPlan.numericIntake,
        percentIntake: mealPlan.percentIntake,
        remainingIntake: mealPlan.remainingIntake,
        requiredIntake: mealPlan.requiredIntake
      });
    }
  }
  public removeMealPlan(mealPlan: MealPlan): void {
    this._mealPlans.remove(mealPlan);
  }
}