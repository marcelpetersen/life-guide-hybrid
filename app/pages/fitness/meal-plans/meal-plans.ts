import { Component, OnInit } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';
import { Modal, NavController } from 'ionic-angular';
import { MD_TOOLBAR_DIRECTIVES } from '@angular2-material/toolbar';
import { MATERIAL_DIRECTIVES } from 'ng2-material';

import { ActivityPlan, ActivityPlanService } from '../activity-plans';
import { DateFilterPipe } from './shared';
import { Food } from '../../food';
import { MealAddPage } from './meal-add/meal-add';
import { MealPlanNutritionPage } from './meal-plan-nutrition/meal-plan-nutrition';
import { MealPlan, MealPlansService } from './shared';
import { NavbarComponent } from '../../../components';
import { NutritionService } from '../shared';
import { Profile, ProfileService } from '../profile';

@Component({
  templateUrl: 'build/pages/fitness/meal-plans/meal-plans.html',
  directives: [CORE_DIRECTIVES, MATERIAL_DIRECTIVES, MD_TOOLBAR_DIRECTIVES, NavbarComponent],
  pipes: [DateFilterPipe]
})
export class MealPlansPage implements OnInit {
  private _dailyNutrition: Food;
  private _energyExpand: number = 0;
  private _fitnessProfile: any = {};
  private _mealPlans: any;
  private _remainingIntake: Food;
  private _requiredNutrition: Food;
  private _totalIntake: Food;
  public currentDate: string;
  public currentMealPlan: MealPlan;
  public editing: boolean = false;
  public mealPlanNutrition: any;
  constructor(
    private _activityPlanService: ActivityPlanService,
    private _meaplPlansService: MealPlansService,
    private _nav: NavController,
    private _nutritionService: NutritionService,
    private _profileService: ProfileService
  ) { }

  private _getFitnessData(date: string): void {
    this._activityPlanService.getActivityPlans().subscribe(plans => plans.forEach(plan => {
      if (plan.date === date) {
        this._energyExpand = plan.totalEnergy;
      }
    }));
    this._profileService.getMyProfile()
      .subscribe(data => {
        if (!!data && !data.hasOwnProperty('$value')) {
          this._fitnessProfile = data;
        }
      });
  }

  private _getNutritionData(): void {
    if (!!this._fitnessProfile) {
      this._totalIntake = this._nutritionService.calculateTotalIntake(this.mealPlanNutrition);
      this._requiredNutrition = this._profileService.getTotalRequirements(this._energyExpand, this._fitnessProfile);
      this._remainingIntake = this._nutritionService.calculateRemainingIntake(this._requiredNutrition, this._totalIntake);
      this._dailyNutrition = this._nutritionService.calculateDailyNutrition(this._requiredNutrition, this._totalIntake);
    }
    console.log(
      "Energy expand:", this._energyExpand,
      "\nFitness profile:", this._fitnessProfile,
      "\nTotal intake:", this._totalIntake,
      "\nRemaining intake:", this._remainingIntake,
      "\nRequired intake:", this._requiredNutrition,
      "\nTotal nutrition:", this._dailyNutrition
    );
  }

  public syncMealPlan() {
    this.currentMealPlan = new MealPlan(this.currentDate);
    this.mealPlanNutrition = {
      Breakfast: new Food(),
      Brunch: new Food(),
      Lunch: new Food(),
      Snack: new Food(),
      Dinner: new Food()
    };
    this._getFitnessData(this.currentDate);
    this._mealPlans
      .subscribe(mealPlans => {
        mealPlans.forEach(mealPlan => {
          if (mealPlan.date == this.currentDate) {
            this.currentMealPlan['$key'] = mealPlan['$key'];
            if (!!mealPlan.meals) {
              this.currentMealPlan.meals = mealPlan.meals;
              this.mealPlanNutrition = this._nutritionService.calculateMealPlanNutrition(this.currentMealPlan.meals);
            }
          }
        });
      });
    setTimeout(() => {
      if (!this.currentMealPlan['$key']) {
        this._meaplPlansService.addMealPlan(this.currentDate);
      }
      this._getNutritionData();
    }, 1000);
  }

  public mealAdd() {
    let mealAddModal = Modal.create(MealAddPage, { mealPlan: this.currentMealPlan });
    mealAddModal.onDismiss(mealPlan => {
      if (!!mealPlan) {
        this.currentMealPlan = mealPlan;
        this._meaplPlansService.updateMealPlan(this.currentMealPlan);
      }
    });
    this._nav.present(mealAddModal);
  }

  public removeMeal(mealIndex: number, mealTime: string): void {
    this.currentMealPlan.meals[mealTime].splice(mealIndex, 1);
  }

  public editMealPlan(): void {
    if (this.editing) {
      this._meaplPlansService.updateMealPlan(this.currentMealPlan);
      this.syncMealPlan();
      this.editing = false;
    } else {
      this.editing = true;
    }
  }

  public viewDailyNutrition() {
    this._getNutritionData();
    this._nav.push(MealPlanNutritionPage, {
      totalIntake: this._totalIntake,
      remainingIntake: this._remainingIntake,
      requiredNutrition: this._requiredNutrition,
      dailyNutrition: this._dailyNutrition
    });

  }

  ngOnInit() {
    this._mealPlans = this._meaplPlansService.getMealPlans();
    let myDate = new Date(),
      currentDay = myDate.getDate(),
      currentMonth = myDate.getMonth() + 1,
      currentYear = myDate.getFullYear();
    this.currentDate = currentYear + '-' +
      ((currentMonth < 10) ? '0' + currentMonth : currentMonth) + '-' +
      ((currentDay < 10) ? '0' + currentDay : currentDay);
    this.currentMealPlan = new MealPlan(this.currentDate);
    this.syncMealPlan();
  }
}
