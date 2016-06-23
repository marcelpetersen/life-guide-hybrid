import { Component, OnInit } from '@angular/core';
import { FirebaseAuth } from 'angularfire2';
import { NavController, ViewController } from 'ionic-angular';

import { AuthenticationPage } from '../../pages/authentication';
import { FitnessPage } from '../../pages/fitness';

@Component({
    templateUrl: 'build/components/logout/logout.component.html'
})
export class LogoutComponent implements OnInit {
    constructor(private _auth: FirebaseAuth, private _nav: NavController, private _viewCtrl: ViewController) { }
    
    public logout(): void {
        this._viewCtrl.dismiss();
        this._auth.logout();
        this._nav.setRoot(AuthenticationPage);
    }

    ngOnInit() { }

}