import { Component, OnInit } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';
import { FirebaseListObservable } from 'angularfire2';
import { Modal, NavController } from 'ionic-angular';

import { ActivityPlanService } from '../activity-plans';
import { Food } from '../../food';
import { ItemLimitPipe, ItemSearchPipe } from '../../shared';
import { MpDetailsPage } from './mp-details/mp-details';
import { MpEditPage } from './mp-edit/mp-edit';
import { MpNutritionPage } from './mp-nutrition/mp-nutrition';
import { MealPlan, MealPlansService } from './shared';
import { NavbarComponent } from '../../../components';
import { NutritionService } from '../shared';
import { Profile, ProfileService } from '../profile';

@Component({
  templateUrl: 'build/pages/fitness/meal-plans/meal-plans.html',
  directives: [CORE_DIRECTIVES, NavbarComponent],
  pipes: [ItemLimitPipe, ItemSearchPipe]
})
export class MealPlansPage implements OnInit {
  private _fitnessProfile: Profile;
  public limitQuery: number = 10;
  public mealPlans: FirebaseListObservable<MealPlan[]>;
  public searchQuery: string = '';
  constructor(
    private _apService: ActivityPlanService,
    private _meaplPlansService: MealPlansService,
    private _nav: NavController,
    private _nutritionService: NutritionService,
    private _profileService: ProfileService
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

  public filterMp(event): void {
    this.searchQuery = event;
  }

  public loadMore(infiniteScroll) {
    setTimeout(() => {
      this.limitQuery += 5;
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

  public refreshMp(mealPlan: MealPlan): void {
    this._apService.getApDate(mealPlan.date).then(res => {
      this._profileService.getTotalRequirements(res.totalEnergy, this._fitnessProfile).then(data => {
        mealPlan.requiredIntake = data;
        mealPlan.remainingIntake = this._nutritionService.getRemainingIntake(data, mealPlan.numericIntake);
        mealPlan.percentIntake = this._nutritionService.getPercentIntake(data, mealPlan.numericIntake);
      });
    });
  }

  ngOnInit() {
    this.mealPlans = this._meaplPlansService.getMealPlans();
    this._profileService.getMyProfile().subscribe(profile => this._fitnessProfile = profile);
  }
}