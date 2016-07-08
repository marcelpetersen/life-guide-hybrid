import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
 import { FirebaseListObservable } from 'angularfire2';

import { NavbarComponent } from '../../components';
import { Post, PostsService } from './shared';
import { PostEditPage } from './post';

@Component({
  directives: [NavbarComponent],
  templateUrl: 'build/pages/blog/blog.html',
})
export class BlogPage implements OnInit {
  public userPosts: FirebaseListObservable<Post[]>;
  constructor(private _nav: NavController, private _postService: PostsService) {}

  public createPost(): void {
    let newPost: Post = new Post();
    this._nav.push(PostEditPage, { post: newPost })
  }

  ngOnInit() {
    this.userPosts = this._postService.getMyPosts();
  }
}
