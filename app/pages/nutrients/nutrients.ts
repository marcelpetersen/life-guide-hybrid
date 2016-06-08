import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

/*
  Generated class for the NutrientsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/nutrients/nutrients.html',
})
export class NutrientsPage {
  micronutrients: FirebaseListObservable<any[]>;
  macronutrients: FirebaseListObservable<any[]>;
  constructor(public nav: NavController, af: AngularFire) {
    this.micronutrients = af.database.list('/micronutrients');
    this.macronutrients = af.database.list('/macronutrients');
  }
}
