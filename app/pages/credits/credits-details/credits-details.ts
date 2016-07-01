import { Component, OnInit } from '@angular/core';
import { NavParams } from 'ionic-angular';

@Component({
    templateUrl: 'build/pages/credits/credits-details/credits-details.html',
})
export class CreditsDetailsPage implements OnInit {
    public source: any;
    constructor(private _params: NavParams) { }

    ngOnInit() {
        this.source = this._params.data.source;
    }

}