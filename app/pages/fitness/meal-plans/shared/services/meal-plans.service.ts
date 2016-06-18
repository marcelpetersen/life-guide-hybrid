import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { AuthenticationService } from '../../../../authentication';
import { MealPlan } from '../model/meal-plan.model';

@Injectable()
export class MealPlansService {
  private _mealPlans: FirebaseListObservable<MealPlan[]>;
  constructor(private _af: AngularFire, private _authService: AuthenticationService) {
    this._authService.getAuth().subscribe(authData => {
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