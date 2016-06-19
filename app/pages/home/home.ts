import { Component, OnInit } from "@angular/core";
import { CORE_DIRECTIVES } from '@angular/common';
import { FirebaseAuth } from 'angularfire2';

import { NavbarComponent } from '../../components';

@Component({
  templateUrl: 'build/pages/home/home.html',
  directives: [NavbarComponent]
})
export class HomePage implements OnInit {
  public username: string;
  public userImage: string;
  constructor(private _auth: FirebaseAuth) { }

  ngOnInit(): void {
    this._auth.subscribe(authData => {
      if (authData) {
        this.username = authData.auth.displayName;
        this.userImage = authData.auth.photoURL;
      }
    });
  }
}
