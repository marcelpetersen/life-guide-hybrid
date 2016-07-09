import { Component, ElementRef, OnInit, Renderer } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
    templateUrl: 'build/pages/blog/post/post-edit/text-options/text-options.html'
})
export class TextOptionsPage implements OnInit {
    public contentEl: ElementRef;
    constructor(
        private _nav: NavController,
        private _params: NavParams,
        private _render: Renderer,
        private _viewCtrl: ViewController
    ) { }

    public addHeading(): void {
        this._render.createElement(this.contentEl.nativeElement, 'h1');
        this._render.setText(this.contentEl.nativeElement.lastChild, "Add your heading");
    }

    public changeFont(fontStyle: string): void {
        let docSelection: any = document.getSelection(),
            selectedText: string = docSelection.toString(),
            selectedHtml: string = docSelection.focusNode.parentNode.innerHTML;
        selectedHtml = selectedHtml.replace(selectedText, `<span style="font-weight: bold">${selectedText}</span>`);
        docSelection.focusNode.parentNode.innerHTML = selectedHtml;
    }

    ngOnInit() {
        this.contentEl = this._params.data.contentEl;
        console.log(this.contentEl)
    }

}