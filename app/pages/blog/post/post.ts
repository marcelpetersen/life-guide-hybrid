import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';
import { NavController, NavParams, Popover } from 'ionic-angular';

import { Post } from '../shared';
import { TextOptionsPage } from './text-options/text-options';

@Component({
    directives: [CORE_DIRECTIVES],
    templateUrl: 'build/pages/blog/post/post.html'
})
export class PostPage implements OnInit {
    @ViewChildren('postElement') postEl: QueryList<any>;
    public editing: boolean = false;
    public focusedEl: any;
    public postElements: string[] = [];
    public post: Post;
    public showInfo: boolean = true;
    public tags: string[] = [];
    constructor(private _nav: NavController, private _params: NavParams) { }

    public editPost(): void {
        if (this.editing) {
            this.post.content = '';
            this.postEl.toArray().forEach((element, idx) => {
                this.post.content += `<${this.tags[idx]}>${element._elementRef.nativeElement.firstChild.value}</${this.tags[idx]}><br/>`;
            });
            this.editing = false;
        } else {
            this.tags = [];
            this.postElements = this.post.content.split("<br/>");
            this.postElements.forEach((el, idx) => {
                if (el.startsWith("<h1>")) {
                    this.tags.push('h1');
                    this.postElements[idx] = el.substring(4, el.length - 5);
                } else if (el.startsWith('<p>')) {
                    this.tags.push('p');
                     this.postElements[idx] = el.substring(3, el.length - 4);
                } else if (el.startsWith('<blockquote>')) {
                    this.tags.push('blockquote');
                     this.postElements[idx] = el.substring(12, el.length - 13);
                }
            });
            console.clear()
            console.log(this.postElements);
            this.editing = true;
        }
    }

    public logFocused(el: any): void {
        this.focusedEl = el;
        console.log(el);
    }

    public toggleInfo(): void {
        this.showInfo = !this.showInfo;
    }

    public showOptions(event): void {
        let popover = Popover.create(TextOptionsPage, { focusedEl: this.focusedEl, elements: this.postElements, tags: this.tags });
        this._nav.present(popover, {
            ev: event
        });
    }

    ngOnInit() {
        this.post = this._params.data.post;
        let myDate = new Date(),
            currentDay = myDate.getDate(),
            currentMonth = myDate.getMonth() + 1,
            currentYear = myDate.getFullYear();
        this.post.date = currentYear + '-' +
            ((currentMonth < 10) ? '0' + currentMonth : currentMonth) + '-' +
            ((currentDay < 10) ? '0' + currentDay : currentDay);

        this.post.content = "<h1>This is my interesting headline</h1><br/><p>Hello my dear friend</p><br/><blockquote>It's said that</blockquote>";
    }

}