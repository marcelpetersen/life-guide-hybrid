import { Component, ElementRef, OnInit, Renderer } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
    templateUrl: 'build/pages/blog/post/text-options/text-options.html'
})
export class TextOptionsPage implements OnInit {
    public contentEl: HTMLBaseElement;
    constructor(
        private _nav: NavController,
        private _params: NavParams,
        private _render: Renderer,
        private _viewCtrl: ViewController
    ) { }

    public changeStyle(style: string): void {
        let docSelection: any = document.getSelection(),
            selectedText: string = docSelection.toString();
        switch (style) {
            case 'bold':
                if (!!selectedText) {
                    let selectedNode: any = docSelection.focusNode.parentNode;
                    if (selectedNode.style.fontWeight === 'bold') {
                        selectedNode.parentNode.replaceChild(document.createTextNode(selectedText), selectedNode);
                    } else {
                        let selectedHtml: string = docSelection.focusNode.parentNode.innerHTML;
                        selectedHtml = selectedHtml.replace(selectedText, `<span style="font-weight: bold">${selectedText}</span>`);
                        docSelection.focusNode.parentNode.innerHTML = selectedHtml;
                    }
                }
                break;
            case 'italics':
                if (!!selectedText) {
                    let selectedNode: any = docSelection.focusNode.parentNode;
                    if (selectedNode.style.fontStyle === 'italic') {
                        selectedNode.parentNode.replaceChild(document.createTextNode(selectedText), selectedNode);
                    } else {
                        let selectedHtml: string = docSelection.focusNode.parentNode.innerHTML;
                        selectedHtml = selectedHtml.replace(selectedText, `<span style="font-style: italic">${selectedText}</span>`);
                        docSelection.focusNode.parentNode.innerHTML = selectedHtml;
                    }
                }
                break;
            case 'underline':
                if (!!selectedText) {
                    let selectedNode: any = docSelection.focusNode.parentNode;
                    if (selectedNode.style.textDecoration === 'underline') {
                        selectedNode.parentNode.replaceChild(document.createTextNode(selectedText), selectedNode);
                    } else {
                        let selectedHtml: string = docSelection.focusNode.parentNode.innerHTML;
                        selectedHtml = selectedHtml.replace(selectedText, `<span style="text-decoration: underline">${selectedText}</span>`);
                        docSelection.focusNode.parentNode.innerHTML = selectedHtml;
                    }
                }
                break;
            case 'heading':
                if (!!selectedText) {
                    let selectedHtml: string = docSelection.focusNode.parentNode.innerHTML;
                    selectedHtml = selectedHtml.replace(selectedText, `<h1 class="post-heading">${selectedText}</h1>`);
                } else {
                    this._render.createElement(this.contentEl, 'h1', null);
                    this._render.setText(this.contentEl.lastChild, "Add your heading");
                }
                break;
            default:
                break;
        }
    }

    ngOnInit() {
        this.contentEl = this._params.data.contentEl.nativeElement;
        console.clear()
        console.log(this.contentEl);
    }

}