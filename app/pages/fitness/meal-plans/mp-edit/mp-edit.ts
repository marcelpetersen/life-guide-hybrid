import { Component, OnInit } from '@angular/core';
import { CORE_DIRECTIVES, NgForm } from '@angular/common';
import { Alert, Modal, NavController, NavParams, Toast, ViewController } from 'ionic-angular';

import { ActivityPlanService } from '../../activity-plans';
import { Food, FoodService } from '../../../food';
import { MealAddPage } from '../meal-add/meal-add';
import { MealPlan } from '../shared';
import { Profile, ProfileService } from '../../profile';
import { NutritionService } from '../../shared';
import { Recipe, RecipeService } from '../../../recipes';

@Component({
    templateUrl: 'build/pages/fitness/meal-plans/mp-edit/mp-edit.html',
    directives: [CORE_DIRECTIVES, NgForm]
})
export class MpEditPage implements OnInit {
    private _energyExpand: number = 0;
    private _fitnessProfile: Profile;
    private _meals: Food[] | Recipe[];
    public mpDate: string;
    public mealPlan: MealPlan;
    constructor(
        private _apService: ActivityPlanService,
        private _foodService: FoodService,
        private _nav: NavController,
        private _nutritionService: NutritionService,
        private _params: NavParams,
        private _profileService: ProfileService,
        private _recipeService: RecipeService,
        private _viewCtrl: ViewController) { }

    public cancelMp(): void {
        this._viewCtrl.dismiss();
    }

    public changeQuantity(meal: any): void {
        let quantityModal = Alert.create({
            title: `${meal.name}`,
            message: "Enter quantity",
            inputs: [
                {
                    name: 'quantity',
                    placeholder: meal.hasOwnProperty('chef') ? 'Units' : 'Grams',
                    type: 'number'
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                    handler: () => {
                        console.log('Canceled');
                    }
                },
                {
                    text: 'Save',
                    handler: data => {
                        meal.amount = +data.quantity;
                    }
                }
            ]
        });
        this._nav.present(quantityModal);
    }

    public createMp(): void {
        if (!this.mealPlan.date) {
            const toast = Toast.create({
                message: 'Please enter the date!',
                showCloseButton: true,
                closeButtonText: 'Ok'
            });
            this._nav.present(toast);
        } else if (
            (this.mealPlan.breakfast.hasOwnProperty('meals') && !!this.mealPlan.breakfast.meals.length) ||
            (this.mealPlan.brunch.hasOwnProperty('meals') && !!this.mealPlan.brunch.meals.length) ||
            (this.mealPlan.lunch.hasOwnProperty('meals') && !!this.mealPlan.lunch.meals.length) ||
            (this.mealPlan.snack.hasOwnProperty('meals') && !!this.mealPlan.snack.meals.length) ||
            (this.mealPlan.dinner.hasOwnProperty('meals') && !!this.mealPlan.dinner.meals.length)
        ) {
            this._nutritionService.setMpNutrition(this.mealPlan);
            this._profileService.getTotalRequirements(this._energyExpand, this._fitnessProfile).then(data => {
                this.mealPlan.requiredIntake = data;
                this.mealPlan.remainingIntake = this._nutritionService.getRemainingIntake(data, this.mealPlan.numericIntake);
                this.mealPlan.percentIntake = this._nutritionService.getPercentIntake(data, this.mealPlan.numericIntake);
                this._viewCtrl.dismiss(this.mealPlan);
            });
        } else {
            const toast = Toast.create({
                message: 'Please enter at least one meal!',
                showCloseButton: true,
                closeButtonText: 'Ok'
            });
            this._nav.present(toast);
        }
    }

    public removeMeal(mpTime: string, index: number): void {
        this.mealPlan[mpTime].meals.splice(index, 1);
    }

    public searchMeal(mpTime: string): void {
        let mealAddModal = Modal.create(MealAddPage, { meals: this._meals });
        mealAddModal.onDismiss(meals => {
            if (!this.mealPlan[mpTime].hasOwnProperty('meals')) {
                this.mealPlan[mpTime].meals = [];
            }
            if (!!meals) {
                meals.forEach(meal => {
                    if (meal.hasOwnProperty('$key')) {
                        delete meal['$key'];
                    }
                    if (this.mealPlan[mpTime].meals && this.mealPlan[mpTime].meals.indexOf(meal) === -1) {
                        this.mealPlan[mpTime].meals.push(meal);
                    }
                });
            }
        });
        this._nav.present(mealAddModal);
    }

    ngOnInit() {
        let myDate = new Date(),
            currentDay = myDate.getDate(),
            currentMonth = myDate.getMonth() + 1,
            currentYear = myDate.getFullYear();
        this.mealPlan = this._params.data.mealPlan;
        if (!this.mealPlan.date) {
            this.mealPlan.date = currentYear + '-' +
                ((currentMonth < 10) ? '0' + currentMonth : currentMonth) + '-' +
                ((currentDay < 10) ? '0' + currentDay : currentDay);
        }
        this._profileService.getMyProfile().subscribe(profile => this._fitnessProfile = profile);
        this._apService.getApDate(this.mealPlan.date).then(res => this._energyExpand = res.totalEnergy);
        this._foodService.getFood().subscribe(food => this._meals = food);
        this._recipeService.getAllRecipes().subscribe(recipes => this._meals = [].concat(recipes, this._meals));
    }
}