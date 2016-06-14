export class MealPlan {
    constructor (
        public date: any = new Date(),
        public meals: any = {
            Breakfast: [],
            Brunch: [],
            Lunch: [],
            Snack: [],
            Dinner: []
        }
    ) {}
}