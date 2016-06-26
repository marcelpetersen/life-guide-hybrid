import { Injectable } from '@angular/core';

import { Food } from '../../../food';
import { MealPlan } from '../../meal-plans';

@Injectable()
export class NutritionService {
    constructor() { }

    public calculateMealPlanNutrition(mealPlan: MealPlan): any {
        let mp: any = {
            Breakfast: new Food(),
            Brunch: new Food(),
            Lunch: new Food(),
            Snack: new Food(),
            Dinner: new Food()
        },
            nutritionValues: Food,
            amount: number = 1;
        for (let mealTime in mealPlan) {
            nutritionValues = new Food();
            mealPlan[mealTime].forEach(meal => {
                amount = +meal.amount || 1;
                if (meal.hasOwnProperty("chef")) {
                    for (let nutrientCategory in meal.nutrients) {
                        let nutrients = meal.nutrients[nutrientCategory];
                        if (nutrientCategory === 'energy') {
                            nutritionValues[nutrientCategory] += +nutrients * amount;
                        }
                        for (let nutrient in nutrients) {
                            if (nutritionValues.hasOwnProperty(nutrientCategory)
                                && nutritionValues[nutrientCategory].hasOwnProperty(nutrient)) {
                                nutritionValues[nutrientCategory][nutrient] += +nutrients[nutrient] * amount;

                            }
                        }
                    }
                } else {
                    for (let nutrientCategory in meal) {
                        let nutrients = meal[nutrientCategory];
                        if (nutrientCategory === 'energy') {
                            nutritionValues[nutrientCategory] += +nutrients * amount;
                        }
                        for (let nutrient in nutrients) {
                            if (nutritionValues.hasOwnProperty(nutrientCategory)
                                && nutritionValues[nutrientCategory].hasOwnProperty(nutrient)) {
                                nutritionValues[nutrientCategory][nutrient] += +nutrients[nutrient] * amount;

                            }
                        }
                    }
                }
            });
            mp[mealTime] = nutritionValues;
        }
        return mp;
    }

    public calculateTotalIntake(mealTimes: any): Food {
        let totalIntake: Food = new Food(),
            amount: number = 1;
        for (let mealTime in mealTimes) {
            let mealTimeNutrition = mealTimes[mealTime];
            for (let nutrientCategory in mealTimeNutrition) {
                let nutrients = mealTimeNutrition[nutrientCategory];
                if (nutrientCategory === 'energy') {
                    totalIntake[nutrientCategory] += +nutrients * amount;
                }
                for (let nutrient in nutrients) {
                    if (totalIntake.hasOwnProperty(nutrientCategory)
                        && totalIntake[nutrientCategory].hasOwnProperty(nutrient)) {
                        totalIntake[nutrientCategory][nutrient] += +nutrients[nutrient] * amount;

                    }
                }
            }
        }
        return totalIntake;
    }

    public calculateRemainingIntake(requiredIntake, totalIntake): Food {
        let nutritionValues: Food = new Food();
        for (let nutrientCategory in requiredIntake) {
            let nutrients = requiredIntake[nutrientCategory];
            if (nutrientCategory === 'energy' && nutritionValues.hasOwnProperty(nutrientCategory)) {
                nutritionValues[nutrientCategory] = (nutrients === 0)
                    ? 0
                    : nutrients - totalIntake[nutrientCategory];
                if (nutritionValues[nutrientCategory] < 0) {
                    nutritionValues[nutrientCategory] = 0;
                }
            }
            for (let nutrient in nutrients) {
                if (nutritionValues.hasOwnProperty(nutrientCategory)
                    && nutritionValues[nutrientCategory].hasOwnProperty(nutrient)) {
                    nutritionValues[nutrientCategory][nutrient] = (nutrients[nutrient] === 0)
                        ? 0
                        : nutrients[nutrient] - totalIntake[nutrientCategory][nutrient];
                    if (nutritionValues[nutrientCategory][nutrient] < 0) {
                        nutritionValues[nutrientCategory][nutrient] = 0;
                    }
                }
            }
        }
        return nutritionValues;
    }

    public calculateDailyNutrition(requiredIntake, totalIntake): Food {
        let nutritionValues: Food = new Food();
        for (let nutrientCategory in requiredIntake) {
            let nutrients = requiredIntake[nutrientCategory];
            if (nutrientCategory === 'energy' && nutritionValues.hasOwnProperty(nutrientCategory)) {
                if (nutrients > 0) {
                    nutritionValues[nutrientCategory] = (totalIntake[nutrientCategory] / nutrients) * 100;
                } else {
                    nutritionValues[nutrientCategory] = (totalIntake[nutrientCategory] === 0)
                        ? 100
                        : 100 + totalIntake[nutrientCategory];
                }
            }
            for (let nutrient in nutrients) {
                if (nutritionValues.hasOwnProperty(nutrientCategory)
                    && nutritionValues[nutrientCategory].hasOwnProperty(nutrient)) {
                    if (nutrients[nutrient] > 0) {
                        nutritionValues[nutrientCategory][nutrient] = (totalIntake[nutrientCategory][nutrient] / nutrients[nutrient]) * 100;
                    } else {
                        nutritionValues[nutrientCategory][nutrient] = (totalIntake[nutrientCategory][nutrient] === 0)
                            ? 100
                            : 100 + totalIntake[nutrientCategory][nutrient];
                    }
                }
            }
        }
        return nutritionValues;
    }
}