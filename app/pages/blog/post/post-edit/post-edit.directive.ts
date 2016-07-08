import { Directive, ElementRef, HostListener, Input, OnChanges } from '@angular/core';

@Directive({
    selector: '[postEdit]'
})
export class PostEditDirective implements OnChanges {
    @Input() editing: boolean;
    constructor(private _el: ElementRef) {
        console.log(this._el);
    }

    ngOnChanges(changes: any) {
        console.log(this._el.nativeElement.contentEditable)
        this._el.nativeElement.contentEditable = changes.editing.currentValue;
    }
}