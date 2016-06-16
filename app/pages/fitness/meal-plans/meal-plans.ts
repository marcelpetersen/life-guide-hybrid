import { Component, OnInit } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';
import { Modal, NavController } from 'ionic-angular';
import { MD_TOOLBAR_DIRECTIVES } from '@angular2-material/toolbar';
import { MATERIAL_DIRECTIVES } from 'ng2-material';

import { DateFilterPipe } from './shared';
import { Food } from '../../food';
import { MealAddPage } from './meal-add/meal-add';
import { MealPlanNutritionPage } from './meal-plan-nutrition/meal-plan-nutrition';
import { MealPlan, MealPlansService } from './shared';
import { NutritionService } from '../shared';

@Component({
  templateUrl: 'build/pages/fitness/meal-plans/meal-plans.html',
  directives: [CORE_DIRECTIVES, MATERIAL_DIRECTIVES, MD_TOOLBAR_DIRECTIVES],
  pipes: [DateFilterPipe]
})
export class MealPlansPage implements OnInit {
  currentDate: string;
  currentMealPlan: MealPlan;
  editing: boolean = false;
  mealPlans: any;
  mealPlanNutrition: any;
  constructor(
    private _meaplPlansService: MealPlansService, 
    private _nav: NavController, 
    private _nutritionService: NutritionService
    ) { }

  mealAdd() {
    let mealAddModal = Modal.create(MealAddPage, { mealPlan: this.currentMealPlan });
    mealAddModal.onDismiss(mealPlan => {
      if (!!mealPlan) {
        this.currentMealPlan = mealPlan;
        this._meaplPlansService.updateMealPlan(this.currentMealPlan);
      }
    });
    this._nav.present(mealAddModal);
  }

  removeMeal(mealIndex: number, mealTime: string): void {
    this.currentMealPlan.meals[mealTime].splice(mealIndex, 1);
  }

  editMealPlan(): void {
    if (this.editing) {
      this._meaplPlansService.updateMealPlan(this.currentMealPlan);
      this.editing = false;
    } else {
      this.editing = true;
    }
  }

  viewDailyNutrition() {
    this._nav.push(MealPlanNutritionPage, { totalNutrition: this.mealPlanNutrition.Total });
  }

  syncMealPlan() {
    this.currentMealPlan = new MealPlan(this.currentDate);
    this.mealPlans
      .subscribe(mealPlans => {
        mealPlans.forEach(mealPlan => {
          if (mealPlan.date == this.currentDate) {
            this.currentMealPlan['$key'] = mealPlan['$key'];
            if (!!mealPlan.meals) {
              this.currentMealPlan.meals = mealPlan.meals;
              this.mealPlanNutrition = this._nutritionService.calculateTotalNutrition(this.currentMealPlan.meals);
            }
          }
        });
      });
    setTimeout(() => {
      if (!this.currentMealPlan['$key']) {
        this._meaplPlansService.addMealPlan(this.currentDate);
      }
    }, 3000);
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
    this.currentMealPlan = new MealPlan(this.currentDate);
    this.mealPlanNutrition = {
      Breakfast: new Food(),
      Brunch: new Food(),
      Lunch: new Food(),
      Snack: new Food(),
      Dinner: new Food()
    }
    this.syncMealPlan();
  }
}
