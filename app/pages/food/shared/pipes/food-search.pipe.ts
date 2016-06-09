import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'foodSearch'
})
export class FoodSearchPipe implements PipeTransform {
    transform(value: any, exponent: string): any {
       let filter = exponent.toLocaleLowerCase();
       return filter ? value.filter(food => food.name.toLocaleLowerCase().indexOf(filter) !== -1) : value;
    }
}