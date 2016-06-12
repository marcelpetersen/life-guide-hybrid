import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MD_TOOLBAR_DIRECTIVES } from '@angular2-material/toolbar';
import { MATERIAL_DIRECTIVES } from 'ng2-material';

import { MealPlan } from './meal-plans.model';
import { MealPlansService } from './meal-plans.service';

@Component({
  templateUrl: 'build/pages/fitness/meal-plans/meal-plans.html',
  directives: [MATERIAL_DIRECTIVES, MD_TOOLBAR_DIRECTIVES]
})
export class MealPlansPage implements OnInit{
  mealPlans: any;
  currentMealPlan: MealPlan;
  currentDate: string = '2016-05-12';
  myDate: any;
  constructor(private _meaplPlansService: MealPlansService, public nav: NavController) {
    this.mealPlans = this._meaplPlansService.getMealPlans();
    this.currentMealPlan = this.mealPlans.subscribe(
      mealPlans => mealPlans.filter(mealPlan => mealPlan.date === this.currentDate)
      );
    this.myDate = new Date();
    let currentDay = this.myDate.getDate(),
        currentMonth = this.myDate.getMonth(),
        currentYear = this.myDate.getFullYear();
    this.currentDate = currentYear + '-' +
      ((currentMonth < 10) ? '0' + currentMonth : currentMonth) + '-' +
      ((currentDay < 10) ? '0' + currentDay : currentDay);
      console.log(this.currentDate);
  }
  ngOnInit() { }
}
