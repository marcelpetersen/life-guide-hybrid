import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'itemSearch'
})
export class ItemSearchPipe implements PipeTransform {
    transform(value: any[], exponent: string, prop: string): any {
       let filter = exponent.toLocaleLowerCase();
       if (!!value) {
           return filter ? value.filter(item => item[prop].toLocaleLowerCase().indexOf(filter) !== -1) : value;
       }
    }
}