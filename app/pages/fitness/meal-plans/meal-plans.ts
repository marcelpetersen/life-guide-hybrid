import { Component, OnInit } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';
import { Modal, NavController } from 'ionic-angular';
import { MD_TOOLBAR_DIRECTIVES } from '@angular2-material/toolbar';
import { MATERIAL_DIRECTIVES } from 'ng2-material';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

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
  private _energyExpand: number = 0;
  private _fitnessProfile: Profile;
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

  private _getNutritionData(): any {
    let totalIntake: Food,
      requiredNutrition: Food,
      remainingIntake: Food,
      dailyNutrition: Food;
    totalIntake = this._nutritionService.calculateTotalIntake(this.mealPlanNutrition);
    return new Promise(resolve => {
      this._profileService.getTotalRequirements(this._energyExpand, this._fitnessProfile).then(data => {
        requiredNutrition = data;
        remainingIntake = this._nutritionService.calculateRemainingIntake(requiredNutrition, totalIntake);
        dailyNutrition = this._nutritionService.calculateDailyNutrition(requiredNutrition, totalIntake);
        resolve([].concat(totalIntake, requiredNutrition, remainingIntake, dailyNutrition));
      });
    });
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
    this._meaplPlansService.getMealPlans(this.currentDate).subscribe(mealPlan => {
      if (!!mealPlan.meals) {
        this.currentMealPlan = mealPlan;
      } else {
        this.currentMealPlan['$key'] = mealPlan['$key'];
      }
      this.mealPlanNutrition = this._nutritionService.calculateMealPlanNutrition(this.currentMealPlan.meals);
    });
    this._activityPlanService.getActivityPlans(this.currentDate).subscribe(activityPlan => this._energyExpand = activityPlan.totalEnergy);
    this._profileService.getMyProfile().subscribe(profile => this._fitnessProfile = profile);
  }

  public mealAdd() {
    let mealAddModal = Modal.create(MealAddPage, { mealPlan: this.currentMealPlan });
    mealAddModal.onDismiss(mealPlan => {
      if (!!mealPlan) {
        this.currentMealPlan = mealPlan;
        this._meaplPlansService.updateMealPlan(this.currentMealPlan);
        this.mealPlanNutrition = this._nutritionService.calculateMealPlanNutrition(this.currentMealPlan.meals);
        this._getNutritionData();
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
      this.mealPlanNutrition = this._nutritionService.calculateMealPlanNutrition(this.currentMealPlan.meals);
      this._getNutritionData();
      this.editing = false;
    } else {
      this.editing = true;
    }
  }

  public viewDailyNutrition() {
    this._getNutritionData().then(nutritionData => {
      console.log(
        "\nTotal intake:", nutritionData[0],
        "\nRequired intake:", nutritionData[1],
        "\nnRemaining intake:", nutritionData[2],
        "\nTotal nutrition:", nutritionData[3]
      );
      this._nav.push(MealPlanNutritionPage, {
        totalIntake: nutritionData[0],
        remainingIntake: nutritionData[2],
        requiredNutrition: nutritionData[1],
        dailyNutrition: nutritionData[3]
      });
    });

  }

  ngOnInit() {
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
