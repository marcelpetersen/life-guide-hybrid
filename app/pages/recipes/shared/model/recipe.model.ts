import { Food } from "../../../food";

export class Recipe {
    constructor (
        public name: string = '',
        public category: string = '',
        public dietary: string = '',
        public chef: string = '',
        public ingredients: Food[] = [],
        public prepTime: number = 0,
        public cookMethod: string = '',
        public cookTime: number = 0,
        public cookTemperature: number = 0,
        public nutrients: any = {},
        public servings: number = 1,
        public quantity: number = 0
    ) {}
}