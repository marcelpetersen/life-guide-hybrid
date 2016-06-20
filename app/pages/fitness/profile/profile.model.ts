import { Food } from '../../food';
export class Profile {
    constructor(
        public age: number = 0,
        public bmi: any = {},
        public bmr: number = 0,
        public dailyRequirements: Food = new Food(),
        public energyBalance: any = {},
        public fatPercentage: any = {},
        public forearm: number = 0,
        public gender: string = 'male',
        public goal: string = 'maintain weight',
        public height: number = 0,
        public hips: number = 0,
        public infancy: string = 'no',
        public pregnancyStage: string = '',
        public waist: number = 0,
        public weight: number = 0,
        public wrist: number = 0
    ) {
        bmi.data = 0,
        bmi.normal = true,
        energyBalance.carbohydrates = 0.5,
        energyBalance.protein = 0.25,
        energyBalance.fats = 0.25,
        fatPercentage.data = 0,
        fatPercentage.normal = true
     }
}