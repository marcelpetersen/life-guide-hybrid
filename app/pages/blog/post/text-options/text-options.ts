import { Component, ElementRef, OnInit, Renderer } from '@angular/core';
import { Alert, NavController, NavParams, ViewController } from 'ionic-angular';

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
                    let selectedNode: any = docSelection.focusNode.parentNode,
                        selectedHtml: string = selectedNode.innerHTML;
                    if (selectedNode.tagName === 'STRONG') {
                        selectedNode.parentNode.replaceChild(document.createTextNode(selectedHtml), selectedNode);
                    } else {
                        selectedNode.innerHTML = selectedHtml.replace(selectedText, `<strong>${selectedText}</strong>`);
                    }
                }
                break;
            case 'italics':
                if (!!selectedText) {
                    let selectedNode: any = docSelection.focusNode.parentNode,
                        selectedHtml: string = selectedNode.innerHTML;
                    if (selectedNode.tagName === 'EM') {
                        selectedNode.parentNode.replaceChild(document.createTextNode(selectedHtml), selectedNode);
                    } else {
                        selectedNode.innerHTML = selectedHtml.replace(selectedText, `<em>${selectedText}</em>`);
                    }
                }
                break;
            case 'underline':
                if (!!selectedText) {
                    let selectedNode: any = docSelection.focusNode.parentNode,
                        selectedHtml: string = selectedNode.innerHTML;
                    if (selectedNode.tagName === 'INS') {
                        selectedNode.parentNode.replaceChild(document.createTextNode(selectedHtml), selectedNode);
                    } else {
                        selectedNode.innerHTML = selectedHtml.replace(selectedText, `<ins>${selectedText}</ins>`);
                    }
                }
                break;
            case 'headline':
                if (!!selectedText) {
                    let selectedNode: any = docSelection.focusNode.parentNode,
                        selectedHtml: string = selectedNode.innerHTML;
                    if (selectedNode.tagName === 'H1') {
                        selectedNode.parentNode.replaceChild(document.createTextNode(selectedHtml), selectedNode);
                    } else {
                        selectedNode.innerHTML = selectedHtml.replace(selectedText, `<h1>${selectedText}</h1>`);
                    }
                } else {
                    this._render.createElement(this.contentEl, 'h1', null);
                    this._render.setText(this.contentEl.lastChild, "Add your headline");
                }
                break;
            case 'blockquote':
                if (!!selectedText) {
                    let selectedNode: any = docSelection.focusNode.parentNode,
                        selectedHtml: string = selectedNode.innerHTML;
                    if (selectedNode.tagName === 'BLOCKQUOTE') {
                        selectedNode.parentNode.replaceChild(document.createTextNode(selectedHtml), selectedNode);
                    } else {
                        selectedNode.innerHTML = selectedHtml.replace(selectedText, `<blockquote>${selectedText}</blockquote>`);
                    }
                } else {
                    this._render.createElement(this.contentEl, 'blockquote', null);
                    this._render.setText(this.contentEl.lastChild, "Add your quote");
                }
                break;
            case 'paragraph':
                if (!!selectedText) {
                    let selectedNode: any = docSelection.focusNode.parentNode,
                        selectedHtml: string = selectedNode.innerHTML;
                    if (selectedNode.tagName === 'P') {
                        selectedNode.parentNode.replaceChild(document.createTextNode(selectedHtml), selectedNode);
                    } else {
                        selectedNode.innerHTML = selectedHtml.replace(selectedText, `<p>${selectedText}</p>`);
                    }
                } else {
                    this._render.createElement(this.contentEl, 'p', null);
                    this._render.setText(this.contentEl.lastChild, "Add your content");
                }
                break;
            case 'link':
                if (!!selectedText) {
                    let selectedNode: any = docSelection.focusNode.parentNode,
                        selectedHtml: string = docSelection.focusNode.parentNode.innerHTML;
                    if (selectedNode.tagName === 'A') {
                        selectedNode.parentNode.replaceChild(document.createTextNode(selectedHtml), selectedNode);
                    } else {
                        let linkModal = Alert.create({
                            title: 'URL',
                            message: 'Enter your link',
                            inputs: [
                                {
                                    name: 'link',
                                    placeholder: 'https://site.domain',
                                    type: 'text'
                                },
                            ],
                            buttons: [
                                {
                                    text: 'Cancel',
                                    handler: () => {
                                        console.log('Canceled');
                                    }
                                },
                                {
                                    text: 'Add',
                                    handler: data => {
                                        if (data.link) {
                                            selectedNode.innerHTML = selectedHtml.replace(selectedText, selectedText.link(data.link));
                                        }
                                    }
                                }
                            ]
                        });
                        this._nav.present(linkModal);
                    }
                }
                break;
            default:
                break;
        }
    }

    ngOnInit() {
        this.contentEl = this._params.data.contentEl.nativeElement;
    }

}