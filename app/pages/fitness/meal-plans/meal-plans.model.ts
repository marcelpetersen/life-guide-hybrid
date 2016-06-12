export class MealPlan {
    constructor (
        date: any = new Date(),
        meals: any = {
            Breakfast: [],
            Brunch: [],
            Lunch: [],
            Snack: [],
            Dinner: []
        }
    ) {}
}