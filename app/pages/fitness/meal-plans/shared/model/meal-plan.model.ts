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
        public percentIntake: Food = new Food(),
        public numericIntake: Food = new Food(),
        public remainingIntake: Food = new Food(),
        public requiredIntake: Food = new Food()
    ) { }
}