import { Component, OnInit } from "@angular/core";
import { NavParams } from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage implements OnInit {
  public username: string;
  constructor(private _params: NavParams) {
    
  }

  ngOnInit(): void {
    this.username = this._params.data.authData.auth.displayName;
  }
}
