import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { AngularFire, FirebaseAuth, FirebaseListObservable } from 'angularfire2';

import { Post } from '../';

@Injectable()
export class PostsService {
    private _allPosts: FirebaseListObservable<Post[]>;
    private _userPosts: FirebaseListObservable<Post[]>;
    constructor(private _af: AngularFire, private _auth: FirebaseAuth) {
        this._allPosts = _af.database.list('/posts');
        this._auth.subscribe(authData => {
            if (authData) {
                this._userPosts = _af.database.list(`/posts/${authData.uid}`);
            }
        });
    }

    public getAllPosts(): Observable<any> {
        return new Observable(observer => {
            this._allPosts.subscribe(users => users.forEach(userPosts => {
                if (!!userPosts) {
                    observer.next(Object.values(userPosts));
                    //observer.complete();
                } else {
                    observer.error("No recipes found");
                }
            }));
        });
    }

    public getMyPosts(): FirebaseListObservable<Post[]> {
        return this._userPosts;
    }

}