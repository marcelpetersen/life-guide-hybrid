import { Component, ElementRef, OnInit, Renderer } from '@angular/core';
import { Alert, NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
    templateUrl: 'build/pages/blog/post/text-options/text-options.html'
})
export class TextOptionsPage implements OnInit {
    public _focusedEl: any;
    private _elements: string[];
    private _tags: string[];
    constructor(
        private _nav: NavController,
        private _params: NavParams,
        private _render: Renderer,
        private _viewCtrl: ViewController
    ) { }

    public insertMetaTag(sStartTag: string, sEndTag: string): void {
        let bDouble = arguments.length > 1,
            oMsgInput: any = this._focusedEl._elementRef.nativeElement.firstChild,
            nSelStart = oMsgInput.selectionStart,
            nSelEnd = oMsgInput.selectionEnd,
            sOldText = oMsgInput.value;
        oMsgInput.value = sOldText.substring(0, nSelStart) + (bDouble ? sStartTag + sOldText.substring(nSelStart, nSelEnd) + sEndTag : sStartTag) + sOldText.substring(nSelEnd);
        oMsgInput.setSelectionRange(bDouble || nSelStart === nSelEnd ? nSelStart + sStartTag.length : nSelStart, (bDouble ? nSelEnd : nSelStart) + sStartTag.length);
        oMsgInput.focus();
    }

    public changeText(tag: string): void {
        this._tags.push(`${tag}`);
        this._elements.push("");
    }

    ngOnInit() {
        this._focusedEl = this._params.data.focusedEl;
        this._elements = this._params.data.elements;
        this._tags = this._params.data.tags;
        console.log(this._focusedEl._elementRef.nativeElement.firstChild.selectionStart);
    }

}



    /*
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
*/