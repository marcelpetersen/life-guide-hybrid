import { Component, OnInit } from '@angular/core';

import { NavbarComponent } from '../../../components';

@Component({
    templateUrl: 'build/pages/fitness/profile/profile.html',
    directives: [NavbarComponent]
})
export class ProfilePage implements OnInit {
    constructor() { }

    ngOnInit() { }

}