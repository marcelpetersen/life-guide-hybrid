import { Component, Input, OnInit } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common'
import { NavController, Popover } from 'ionic-angular';
import { FirebaseAuth } from 'angularfire2';

import { LogoutComponent } from '../../components';

@Component({
    selector: 'navbar',
    templateUrl: 'build/components/navbar/navbar.component.html',
    directives: [CORE_DIRECTIVES]
})
export class NavbarComponent implements OnInit {
    @Input() pageTitle: string;
    public username: string;
    public userImage: string;
    constructor(private _auth: FirebaseAuth, private _nav: NavController) { }

    showLogout(event: any): void {
        let logoutPopover = Popover.create(LogoutComponent);
        this._nav.present(logoutPopover, {
            ev: event
        });
    }

    ngOnInit(): void {
        this._auth.subscribe(authData => {
            if (authData) {
                this.username = authData.auth.displayName;
                this.userImage = authData.auth.photoURL;
            }
        });
    }

}