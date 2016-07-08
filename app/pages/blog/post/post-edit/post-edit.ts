import { Component, OnInit } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';
import { NavController, NavParams } from 'ionic-angular';

import { Post } from '../../shared';
import { PostEditDirective } from './post-edit.directive';

@Component({
    directives: [CORE_DIRECTIVES, PostEditDirective],
    templateUrl: 'build/pages/blog/post/post-edit/post-edit.html'
})
export class PostEditPage implements OnInit {
    public editing: boolean = false;
    public postContent: string[] = [];
    public post: Post;
    constructor(private _nav: NavController, private _params: NavParams) { }

    public editPost(): void {
        this.editing = !this.editing;
        console.log(this.post);
    }

    ngOnInit() { 
        this.post = this._params.data.post;
        if (this.post) {
            this.postContent = this.post.content.split('><');
        }
     }

}