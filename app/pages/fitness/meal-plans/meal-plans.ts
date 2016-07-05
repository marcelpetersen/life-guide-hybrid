import { Component, OnInit } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';
import { FirebaseListObservable } from 'angularfire2';
import { Modal, NavController } from 'ionic-angular';

import { Food } from '../../food';
import { ItemLimitPipe } from '../../shared';
import { MpDetailsPage } from './mp-details/mp-details';
import { MpEditPage } from './mp-edit/mp-edit';
import { MpNutritionPage } from './mp-nutrition/mp-nutrition';
import { MealPlan, MealPlansService } from './shared';
import { NavbarComponent } from '../../../components';
import { NutritionService } from '../shared';

@Component({
  templateUrl: 'build/pages/fitness/meal-plans/meal-plans.html',
  directives: [CORE_DIRECTIVES, NavbarComponent],
  pipes: [ItemLimitPipe]
})
export class MealPlansPage implements OnInit {
  public limit: number = 10;
  public mealPlans: FirebaseListObservable<MealPlan[]>;
  constructor(
    private _meaplPlansService: MealPlansService,
    private _nav: NavController,
    private _nutritionService: NutritionService
  ) { }

  public addMealPlan(): void {
    let newMp: MealPlan = new MealPlan();
    let mpAddModal = Modal.create(MpEditPage, { mealPlan: newMp });
    this._nav.present(mpAddModal);
    mpAddModal.onDismiss(mealPlan => {
      if (!!mealPlan) {
        this._meaplPlansService.addMealPlan(mealPlan);
      }
    });
  }

  public editMp(mealPlan: MealPlan): void {
    let mpAddModal = Modal.create(MpEditPage, { mealPlan });
    this._nav.present(mpAddModal);
    mpAddModal.onDismiss(mealPlan => {
      if (!!mealPlan) {
        this._meaplPlansService.updateMealPlan(mealPlan);
      }
    });
  }

  public loadMore(infiniteScroll) {
    setTimeout(() => {
      this.limit += 5;
      infiniteScroll.complete();
    }, 500);
  }

  public removeMp(mealPlan: MealPlan): void {
    this._meaplPlansService.removeMealPlan(mealPlan);
  }

  public openMpDetails(mealPlan: MealPlan): void {
    this._nav.push(MpDetailsPage, { mealPlan });
  }

  public openMpNutrition(mealPlan: MealPlan): void {
    this._nav.push(MpNutritionPage, {
      numericIntake: mealPlan.numericIntake,
      remainingIntake: mealPlan.remainingIntake,
      requiredIntake: mealPlan.requiredIntake,
      percentIntake: mealPlan.percentIntake
    });
  }

  ngOnInit() {
    this.mealPlans = this._meaplPlansService.getMealPlans();
  }
}