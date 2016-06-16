import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'itemSearch'
})
export class ItemSearchPipe implements PipeTransform {
    transform(value: any, exponent: string): any {
       let filter = exponent.toLocaleLowerCase();
       return filter ? value.filter(item => item.name.toLocaleLowerCase().indexOf(filter) !== -1) : value;
    }
}