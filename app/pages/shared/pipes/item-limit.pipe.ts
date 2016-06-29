import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'itemLimit'
})
export class ItemLimitPipe implements PipeTransform {
    transform(value: any[], exponent: number): any {
       if (value) {
           return value.filter((item, index) => {
               if (index < exponent) {
                   return item;
               }
           });
       }
    }
}
