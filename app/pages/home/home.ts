import { Component } from "@angular/core";
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
  items: FirebaseListObservable<any[]>;
  constructor(af: AngularFire) {
    this.items = af.database.list('/items');
  }
}
