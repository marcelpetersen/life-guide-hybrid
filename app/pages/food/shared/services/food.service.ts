import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { Food } from '../';

@Injectable()
export class FoodService {
    private _food: FirebaseListObservable<Food[]>;
    constructor(private _af: AngularFire) {
        this._food = _af.database.list('/food');
    }
    public getFood(): FirebaseListObservable<Food[]> {
        return this._food;
    }
}