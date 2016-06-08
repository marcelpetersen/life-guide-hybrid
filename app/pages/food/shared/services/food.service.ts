import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Injectable()
export class FoodService {
    food: FirebaseListObservable<any[]>;
    constructor(af: AngularFire) {
        this.food = af.database.list('/food');
    }
    getFood(): FirebaseListObservable<any[]> {
        return this.food;
    }
}