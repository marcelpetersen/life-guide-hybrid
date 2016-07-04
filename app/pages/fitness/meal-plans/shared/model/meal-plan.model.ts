import { Food } from '../../../../food';

export class MealPlan {
    constructor (
        public date: string = "",
        public breakfast: any = {
            meals: [],
            total: new Food()
        },
        public brunch: any = {
            meals: [],
            total: new Food()
        },
        public lunch: any = {
            meals: [],
            total: new Food()
        },
        public snack: any = {
            meals: [],
            total: new Food()
        },
        public dinner: any = {
            meals: [],
            total: new Food()
        },
        public totalNutrition: Food = new Food()
    ) { }
}