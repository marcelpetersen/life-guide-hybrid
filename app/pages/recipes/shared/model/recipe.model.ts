export class Recipe {
    constructor (
        name: string,
        category: string,
        dietary: string,
        chef: string,
        ingredients: object[],
        prepTime: number,
        cookMethod: string,
        cookTime: number,
        cookTemperature: number,
        steps: string[],
        nutrients: object,
        comment: string
    ) {}
}