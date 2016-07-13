import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'itemSearch'
})
export class ItemSearchPipe implements PipeTransform {
    transform(value: any[], exponent: string = "", prop: string = "name"): any {
       if (!!value && !!value.length) {
           let filter = exponent.toLocaleLowerCase();
           return filter ? value.filter(item => {
               if (typeof item[prop] !== 'string') {
                   let match = false;
                   item[prop].forEach(el => {
                       if (el.toLocaleLowerCase().indexOf(filter) !== -1) {
                           match = true;
                       }
                   });
                   return match;
               } else {
                   return item[prop].toLocaleLowerCase().indexOf(filter) !== -1;
               }
           }) : value;
       }
    }
}