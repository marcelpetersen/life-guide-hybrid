import { Injectable } from '@angular/core';

import { Food } from '../../../food';
import { MealPlan } from '../../meal-plans';

@Injectable()
export class NutritionService {

    constructor() { }

    calculateTotalNutrition(mealPlan: MealPlan): any {
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
        console.log(mp);
        return mp;
    }



}