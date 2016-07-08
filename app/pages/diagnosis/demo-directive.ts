import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: '[demo-directive]'
})
export class DemoDirective {
    constructor(private _el: ElementRef) {
        console.log(this._el);
    }

    @HostListener('click', ['$event'])
    private _log(ev): void {
        console.log(ev);
    }
}