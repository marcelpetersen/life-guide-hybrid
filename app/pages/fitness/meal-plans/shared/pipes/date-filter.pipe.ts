import { Pipe, PipeTransform } from '@angular/core';

import { MealPlan } from '../model';

@Pipe({
    name: 'dateFilter'
})
export class DateFilterPipe implements PipeTransform {
    transform(mealPlans: MealPlan[], date: string): MealPlan[] {
        return (!!mealPlans) ? mealPlans.filter(mealPlan => mealPlan.date === date) : mealPlans;
    }
}