import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'nutrientSearch'
})
export class NutrientSearchPipe implements PipeTransform {
    transform(value: any, exponent: string): any {
       let filter = exponent.toLocaleLowerCase();
       return filter ? value.filter(nutrient => nutrient.name.toLocaleLowerCase().indexOf(filter) !== -1) : value;
    }
}