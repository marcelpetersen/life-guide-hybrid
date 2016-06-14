import { Component, OnInit } from '@angular/core';
import { Modal, NavController } from 'ionic-angular';
import { MD_TOOLBAR_DIRECTIVES } from '@angular2-material/toolbar';
import { MATERIAL_DIRECTIVES } from 'ng2-material';

import { DateFilterPipe } from './shared';
import { MealAddPage } from './meal-add/meal-add';
import { MealPlan, MealPlansService } from './shared';

@Component({
  templateUrl: 'build/pages/fitness/meal-plans/meal-plans.html',
  directives: [MATERIAL_DIRECTIVES, MD_TOOLBAR_DIRECTIVES],
  pipes: [DateFilterPipe]
})
export class MealPlansPage implements OnInit {
  currentDate: string;
  mealPlans: any;
  constructor(private _meaplPlansService: MealPlansService, private _nav: NavController) { }

  mealAdd(mealPlan) {
    let mealAddModal = Modal.create(MealAddPage, { mealPlan });
    mealAddModal.onDismiss(mealPlan => {
      this._meaplPlansService.updateMealPlan(mealPlan);
    });
    this._nav.present(mealAddModal);
  }

  syncMealPlan() {
    let result: MealPlan[];
    this.mealPlans.subscribe(mealPlans => result = mealPlans.filter(mealPlan => mealPlan.date === this.currentDate));
    setTimeout(() => {
      if (!result[0]) {
        this._meaplPlansService.addMealPlan(this.currentDate);
      }
    }, 2000);
  }

  ngOnInit() {
    this.mealPlans = this._meaplPlansService.getMealPlans();
    let myDate = new Date(),
        currentDay = myDate.getDate(),
        currentMonth = myDate.getMonth() + 1,
        currentYear = myDate.getFullYear();
    this.currentDate = currentYear + '-' +
      ((currentMonth < 10) ? '0' + currentMonth : currentMonth) + '-' +
      ((currentDay < 10) ? '0' + currentDay : currentDay);
    this.syncMealPlan();
   }
}
