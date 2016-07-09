import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';
import { NavController, NavParams, Popover } from 'ionic-angular';

import { Post } from '../../shared';
import { TextOptionsPage } from './text-options/text-options';

@Component({
    directives: [CORE_DIRECTIVES],
    templateUrl: 'build/pages/blog/post/post-edit/post-edit.html'
})
export class PostEditPage implements OnInit {
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
     }

}