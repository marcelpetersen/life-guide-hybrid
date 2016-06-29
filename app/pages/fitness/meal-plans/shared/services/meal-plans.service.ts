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

  public getMealPlans(date: string): Observable<any> {

    return new Observable(observer => {
      let mp;
      this._mealPlans.subscribe(mealPlans => mp = mealPlans.filter(mealPlans => mealPlans.date == date)[0]);
      setTimeout(() => {
        if (!mp) {
          this.addMealPlan(date);
        } else {
          observer.next(mp);
        }
      }, 1000);
    });
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