import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';
import { NavController, NavParams, Popover } from 'ionic-angular';

import { Post } from '../shared';
import { TextOptionsPage } from './text-options/text-options';

@Component({
    directives: [CORE_DIRECTIVES],
    templateUrl: 'build/pages/blog/post/post.html'
})
export class PostPage implements OnInit {
    @ViewChild('postContent') contentEl: ElementRef;
    public editing: boolean = false;
    public postContent: string[] = [];
    public post: Post;
    constructor(private _nav: NavController, private _params: NavParams) { }


    public editPost(): void {
        this.editing = !this.editing;
        this.post.content = this.contentEl.nativeElement.innerHTML;
        console.log(this.post);
    }

    public showOptions(event): void {
        let popover = Popover.create(TextOptionsPage, { contentEl: this.contentEl });
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
    }

}