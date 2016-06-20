import { Component, OnInit } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';

import { NavbarComponent } from '../../../components';
import { Profile } from './profile.model';
import { ProfileService } from './profile.service';

@Component({
    templateUrl: 'build/pages/fitness/profile/profile.html',
    directives: [CORE_DIRECTIVES, NavbarComponent]
})
export class ProfilePage implements OnInit {
    public editing: boolean = false;
    public profile: any = new Profile();
    constructor(private _profileService: ProfileService) { }

    public editProfile(): void {
        if (this.editing) {
            this._profileService.setFitness(this.profile);
            this._profileService.updateProfile(this.profile);
            this.editing = false;
        } else {
            this.editing = true;
        }
    }

    ngOnInit() {
        this._profileService.getMyProfile()
        .subscribe(profile => {
            if (!!profile && !profile.hasOwnProperty('$value')) {
                this.profile = profile;
            }
            else {
                this._profileService.addProfile(this.profile);
            }
        });
     }

}