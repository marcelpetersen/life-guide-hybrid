import { Injectable } from '@angular/core';

import { Food } from '../../../food';
import { MealPlan } from '../../meal-plans';

@Injectable()
export class NutritionService {
    constructor() { }

    public calculateMealTimesNutrition(mealPlan: MealPlan): any {
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

    public calculateDailyNutrition(mealTimes: any): Food {
        let totalNutrition: Food = new Food(),
            amount: number = 1;
        for (let mealTime in mealTimes) {
            let mealTimeNutrition = mealTimes[mealTime];
            for (let nutrientCategory in mealTimeNutrition) {
                let nutrients = mealTimeNutrition[nutrientCategory];
                if (nutrientCategory === 'energy') {
                    totalNutrition[nutrientCategory] += +nutrients * amount;
                }
                for (let nutrient in nutrients) {
                    if (totalNutrition.hasOwnProperty(nutrientCategory)
                        && totalNutrition[nutrientCategory].hasOwnProperty(nutrient)) {
                        totalNutrition[nutrientCategory][nutrient] += +nutrients[nutrient] * amount;

                    }
                }
            }
        }
        return totalNutrition;
    }

    public calculateRemainingNutrition(requiredNutrition, totalNutrition): Food {
        let nutritionValues: Food = new Food();
        for (let nutrientCategory in requiredNutrition) {
            let nutrients = requiredNutrition[nutrientCategory];
            if (nutrientCategory === 'energy' && nutritionValues.hasOwnProperty(nutrientCategory)) {
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

    public calculateStatisticNutrition(requiredNutrition, totalNutrition): Food {
        let nutritionValues: Food = new Food();
        for (let nutrientCategory in requiredNutrition) {
            let nutrients = requiredNutrition[nutrientCategory];
            if (nutrientCategory === 'energy' && nutritionValues.hasOwnProperty(nutrientCategory)) {
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
}