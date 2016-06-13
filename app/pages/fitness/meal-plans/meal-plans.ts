import { Component, OnInit } from '@angular/core';
import { Modal, NavController } from 'ionic-angular';
import { MD_TOOLBAR_DIRECTIVES } from '@angular2-material/toolbar';
import { MATERIAL_DIRECTIVES } from 'ng2-material';

import { MealPlan } from './meal-plan.model';
import { MealAddPage } from './meal-add/meal-add';
import { MealPlansService } from './meal-plans.service';

@Component({
  templateUrl: 'build/pages/fitness/meal-plans/meal-plans.html',
  directives: [MATERIAL_DIRECTIVES, MD_TOOLBAR_DIRECTIVES]
})
export class MealPlansPage implements OnInit {
  mealPlans: any;
  currentMealPlan: MealPlan = new MealPlan();
  currentDate: string = '2016-05-12';
  constructor(private _meaplPlansService: MealPlansService, public nav: NavController) {
    this.mealPlans = this._meaplPlansService.getMealPlans();
    let myDate = new Date(),
      currentDay = myDate.getDate(),
      currentMonth = myDate.getMonth() + 1,
      currentYear = myDate.getFullYear();
    this.currentDate = currentYear + '-' +
      ((currentMonth < 10) ? '0' + currentMonth : currentMonth) + '-' +
      ((currentDay < 10) ? '0' + currentDay : currentDay);
    this.getCurrentMealPlan();
  }

  mealAdd() {
    let mealAddModal = Modal.create(MealAddPage);
    mealAddModal.onDismiss(mealData => {
      console.log(mealData);
    });
    this.nav.present(mealAddModal);
  }

  getCurrentMealPlan() {
    let result: MealPlan[];
    this.mealPlans.subscribe(mealPlans => {
      result = mealPlans.filter(mealPlan => mealPlan.date === this.currentDate);
    });
    setTimeout(() => {
      if (!!result[0] && !!result[0].meals) {
        this.currentMealPlan = result[0];
      } else {
        this._meaplPlansService.addMealPlan(this.currentDate);
      }
    }, 2000);
  }

  ngOnInit() { }
}
