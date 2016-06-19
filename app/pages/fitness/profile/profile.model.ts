export class Profile {
    constructor(
        weight: number = 0,
        height: number = 0,
        age: number = 0,
        waist: number = 0,
        hips: number = 0,
        wrist: number = 0,
        forearm: number = 0,
        bmi: {
            data: number,
            normal: boolean,
        },
        bmr: number = 0,
        fatPercentage: {
            data: number,
            normal: boolean
        },
        gender: string = '',
        pregnancyStage: string = '',
        infancy: string = '',
        goal: string = '',
        energyBalance: {
            protein: number,
            carbohydrates: number,
            fats: number
        }
    ) { }
}