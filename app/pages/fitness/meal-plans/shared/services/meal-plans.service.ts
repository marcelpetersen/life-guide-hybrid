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

  public getMpDate(date: string): Promise<MealPlan> {
    return new Promise((resolve, reject) => {
      let found: boolean = false;
      this.getMealPlans().subscribe(mealPlans => mealPlans.forEach((mp, index) => {
        if (mp.date === date) {
          found = true;
          resolve(mp);
        }
      }));
      setTimeout(() => {
        if (!found) {
          reject('No meal plan found with this date');
        }
      }, 3000);
    });
  }

  public getMealPlans(): FirebaseListObservable<MealPlan[]> {
    return this._mealPlans;
  }

  public addMealPlan(mp: MealPlan): void {
    this.getMpDate(mp.date).then(res => {
        let key = res['$key'];
        res = mp;
        res['$key'] = key;
        this.updateMealPlan(res);
      }, err => this._mealPlans.push(mp));
  }

  public updateMealPlan(mp: MealPlan): void {
    this._mealPlans.update(mp['$key'], {
      date: mp.date,
      breakfast: mp.breakfast,
      brunch: mp.brunch,
      lunch: mp.lunch,
      snack: mp.snack,
      dinner: mp.dinner,
      numericIntake: mp.numericIntake,
      percentIntake: mp.percentIntake,
      remainingIntake: mp.remainingIntake,
      requiredIntake: mp.requiredIntake
    });
  }
  public removeMealPlan(mp: MealPlan): void {
    this._mealPlans.remove(mp);
  }
}