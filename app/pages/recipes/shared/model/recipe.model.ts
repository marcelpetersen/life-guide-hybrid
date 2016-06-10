import { IFood } from "../../../food";

export class Recipe {
    constructor (
        name: string = '',
        category: string = '',
        dietary: string = '',
        chef: string = '',
        ingredients: IFood[] = [],
        prepTime: number = 0,
        cookMethod: string = '',
        cookTime: number = 0,
        cookTemperature: number = 0,
        steps: string[] = [],
        nutrients: any = {},
        comment: string = ''
    ) {}
}