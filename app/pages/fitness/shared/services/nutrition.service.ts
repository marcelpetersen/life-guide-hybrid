import { Injectable } from '@angular/core';

import { ActivityPlan, ActivityPlanService } from '../../activity-plans';
import { Food } from '../../../food';
import { MealPlan } from '../../meal-plans';
import { Profile, ProfileService } from '../../profile';

@Injectable()
export class NutritionService {
    constructor(private _activityPlanService: ActivityPlanService, private _profileService: ProfileService) { }

    public calculateTotalNutrition(mealPlan: MealPlan): any {
        let mp: any = {
            Breakfast: new Food(),
            Brunch: new Food(),
            Lunch: new Food(),
            Snack: new Food(),
            Dinner: new Food(),
            Total: new Food()
        },
            nutritionValues: Food,
            amount: number = 1,
            totalNutrition: Food = new Food();
        for (let mealTime in mealPlan) {
            nutritionValues = new Food();
            mealPlan[mealTime].forEach(meal => {
                amount = meal.amount || 1;
                if (meal.hasOwnProperty("chef")) {
                    for (let nutrientCategory in meal.nutrients) {
                        let nutrients = meal.nutrients[nutrientCategory];
                        if (Number.isFinite(nutrients)) {
                            nutritionValues[nutrientCategory] += +nutrients * amount;
                            mp.Total[nutrientCategory] += nutritionValues[nutrientCategory];
                        }
                        for (let nutrient in nutrients) {
                            if (nutritionValues.hasOwnProperty(nutrientCategory)
                                && nutritionValues[nutrientCategory].hasOwnProperty(nutrient)) {
                                nutritionValues[nutrientCategory][nutrient] += +nutrients[nutrient] * amount;
                                mp.Total[nutrientCategory][nutrient] += nutritionValues[nutrientCategory][nutrient];

                            }
                        }
                    }
                } else {
                    for (let nutrientCategory in meal) {
                        let nutrients = meal[nutrientCategory];
                        if (Number.isFinite(nutrients)) {
                            nutritionValues[nutrientCategory] += +nutrients * amount;
                            mp.Total[nutrientCategory] += nutritionValues[nutrientCategory];
                        }
                        for (let nutrient in nutrients) {
                            if (nutritionValues.hasOwnProperty(nutrientCategory)
                                && nutritionValues[nutrientCategory].hasOwnProperty(nutrient)) {
                                nutritionValues[nutrientCategory][nutrient] += +nutrients[nutrient] * amount;
                                mp.Total[nutrientCategory][nutrient] += nutritionValues[nutrientCategory][nutrient];

                            }
                        }
                    }
                }
            });
            mp[mealTime] = nutritionValues;
        }
        return mp;
    }

    public calculateRemainingNutrition(requiredNutrition, totalNutrition): Food {
        let nutritionValues: Food = new Food();
        for (let nutrientCategory in requiredNutrition) {
            let nutrients = requiredNutrition[nutrientCategory];
            if (Number.isFinite(nutrients) && nutritionValues.hasOwnProperty(nutrientCategory)) {
                nutritionValues[nutrientCategory] = (nutrients === 0)
                    ? 0
                    : nutrients - totalNutrition[nutrientCategory];
                if (nutritionValues[nutrientCategory] < 0) {
                    nutritionValues[nutrientCategory] = 0;
                }
            }
            for (let nutrient in nutrients) {
                if (nutritionValues.hasOwnProperty(nutrientCategory)
                    && nutritionValues[nutrientCategory].hasOwnProperty(nutrient)) {
                    nutritionValues[nutrientCategory][nutrient] = (nutrients[nutrient] === 0)
                        ? 0
                        : nutrients[nutrient] - totalNutrition[nutrientCategory][nutrient];
                    if (nutritionValues[nutrientCategory][nutrient] < 0) {
                        nutritionValues[nutrientCategory][nutrient] = 0;
                    }
                }
            }
        }
        return nutritionValues;
    }

    public calculatePercentageNutrition(requiredNutrition, totalNutrition): Food {
        let nutritionValues: Food = new Food();
        for (let nutrientCategory in requiredNutrition) {
            let nutrients = requiredNutrition[nutrientCategory];
            if (Number.isFinite(nutrients) && nutritionValues.hasOwnProperty(nutrientCategory)) {
                if (nutrients > 0) {
                    nutritionValues[nutrientCategory] = (totalNutrition[nutrientCategory] / nutrients) * 100;
                } else {
                    nutritionValues[nutrientCategory] = (totalNutrition[nutrientCategory] === 0)
                        ? 100
                        : 100 + totalNutrition[nutrientCategory];
                }
            }
            for (let nutrient in nutrients) {
                if (nutritionValues.hasOwnProperty(nutrientCategory)
                    && nutritionValues[nutrientCategory].hasOwnProperty(nutrient)) {
                    if (nutrients[nutrient] > 0) {
                        nutritionValues[nutrientCategory][nutrient] = (totalNutrition[nutrientCategory][nutrient] / nutrients[nutrient]) * 100;
                    } else {
                        nutritionValues[nutrientCategory][nutrient] = (totalNutrition[nutrientCategory][nutrient] === 0)
                            ? 100
                            : 100 + totalNutrition[nutrientCategory][nutrient];
                    }
                }
            }
        }
        return nutritionValues;
    }

    public getRequirements(date: string): Food {
        let energyExpand: number = 0,
            energyReady: boolean = false,
            profile: any = {},
            profileReady: boolean = false,
            requirements: Food = new Food();
        this._activityPlanService.getActivityPlans().subscribe(plans => plans.forEach(plan => {
            if (plan.date === date) {
                energyExpand = plan.totalEnergy;
                energyReady = true;
            }
        }));
        this._profileService.getMyProfile()
        .subscribe(data => {
            if (!!data && !data.hasOwnProperty('$value')) {
                profile = data;
                profileReady = true;
            }
        });
        setTimeout(() => {
            if (energyReady && profileReady) {
                requirements = this._profileService.getTotalRequirements(energyExpand, profile);
                console.log(requirements);
            }
        }, 1000);
        if(requirements.energy > 0 ) {
            console.log(requirements);
            return requirements;
        }
    }
}