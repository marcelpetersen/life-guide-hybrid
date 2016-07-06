import { Injectable } from '@angular/core';

import { Food } from '../../../food';
import { MealPlan } from '../../meal-plans';

@Injectable()
export class NutritionService {
    constructor() { }

    public setMpNutrition(mealPlan: MealPlan): void {
        for (let key in mealPlan) {
            if (mealPlan[key].hasOwnProperty('meals') && !!mealPlan[key].meals.length) {
                mealPlan[key].total = new Food();
                mealPlan[key].meals.forEach(meal => {
                    let amount = meal.amount ? +meal.amount : 1;
                    console.log(amount);
                    if (meal.hasOwnProperty("chef")) {
                        // it's a recipe
                        for (let nutrientCategory in meal.nutrients) {
                            let nutrients = meal.nutrients[nutrientCategory];
                            if (nutrientCategory === 'energy') {
                                mealPlan[key].total[nutrientCategory] += +nutrients * amount;
                            }
                            for (let nutrient in nutrients) {
                                mealPlan[key].total[nutrientCategory][nutrient] += +nutrients[nutrient] * amount;
                            }
                        }
                    } else {
                        // it's a common food
                        for (let nutrientCategory in meal) {
                            let nutrients = meal[nutrientCategory];
                            if (nutrientCategory === 'energy') {
                                mealPlan[key].total[nutrientCategory] += +nutrients * amount;
                            }
                            for (let nutrient in nutrients) {
                                mealPlan[key].total[nutrientCategory][nutrient] += +nutrients[nutrient] * amount;
                            }
                        }
                    }
                });
            }
        }
        this.setTotalIntake(mealPlan);
    }

    public setTotalIntake(mealPlan: MealPlan): void {
        mealPlan.numericIntake = new Food();
        for (let nutrientCategory in mealPlan.numericIntake) {
            if (nutrientCategory === 'energy') {
                mealPlan.numericIntake[nutrientCategory] += mealPlan.breakfast.total[nutrientCategory] +
                    mealPlan.brunch.total[nutrientCategory] +
                    mealPlan.lunch.total[nutrientCategory] +
                    mealPlan.snack.total[nutrientCategory] +
                    mealPlan.dinner.total[nutrientCategory];
            }
            for (let nutrient in mealPlan.numericIntake[nutrientCategory]) {
                mealPlan.numericIntake[nutrientCategory][nutrient] += mealPlan.breakfast.total[nutrientCategory][nutrient] +
                    mealPlan.brunch.total[nutrientCategory][nutrient] +
                    mealPlan.lunch.total[nutrientCategory][nutrient] +
                    mealPlan.snack.total[nutrientCategory][nutrient] +
                    mealPlan.dinner.total[nutrientCategory][nutrient];

            }
        }
    }

    public getRemainingIntake(requiredIntake, totalIntake): Food {
        let nutritionValues: Food = new Food();
        for (let nutrientCategory in requiredIntake) {
            let nutrients = requiredIntake[nutrientCategory];
            if (nutrientCategory === 'energy') {
                nutritionValues[nutrientCategory] = (nutrients === 0)
                    ? 0
                    : nutrients - totalIntake[nutrientCategory];
                if (nutritionValues[nutrientCategory] < 0) {
                    nutritionValues[nutrientCategory] = 0;
                }
            }
            for (let nutrient in nutrients) {
                nutritionValues[nutrientCategory][nutrient] = (nutrients[nutrient] === 0)
                    ? 0
                    : nutrients[nutrient] - totalIntake[nutrientCategory][nutrient];
                if (nutritionValues[nutrientCategory][nutrient] < 0) {
                    nutritionValues[nutrientCategory][nutrient] = 0;
                }
            }
        }
        return nutritionValues;
    }

    public getPercentIntake(requiredIntake, totalIntake): Food {
        let nutritionValues: Food = new Food();
        for (let nutrientCategory in requiredIntake) {
            let nutrients = requiredIntake[nutrientCategory];
            if (nutrientCategory === 'energy') {
                if (nutrients > 0) {
                    nutritionValues[nutrientCategory] = (totalIntake[nutrientCategory] / nutrients) * 100;
                } else {
                    nutritionValues[nutrientCategory] = (totalIntake[nutrientCategory] === 0)
                        ? 100
                        : 100 + totalIntake[nutrientCategory];
                }
            }
            for (let nutrient in nutrients) {
                if (nutrients[nutrient] > 0) {
                    nutritionValues[nutrientCategory][nutrient] = (totalIntake[nutrientCategory][nutrient] / nutrients[nutrient]) * 100;
                } else {
                    nutritionValues[nutrientCategory][nutrient] = (totalIntake[nutrientCategory][nutrient] === 0)
                        ? 100
                        : 100 + totalIntake[nutrientCategory][nutrient];
                }
            }
        }
        return nutritionValues;
    }
}