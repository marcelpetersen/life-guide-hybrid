import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { Food } from '../';

@Injectable()
export class FoodService {
    food: FirebaseListObservable<Food[]>;
    constructor(af: AngularFire) {
        this.food = af.database.list('/food');
    }
    getFood(): FirebaseListObservable<Food[]> {
        return this.food;
    }
}