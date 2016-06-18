import { Component, OnInit } from "@angular/core";
import { FirebaseAuth } from 'angularfire2';

@Component({
  templateUrl: 'build/pages/home/home.html'
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
