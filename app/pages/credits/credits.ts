import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { NavbarComponent } from '../../components';

@Component({
  templateUrl: 'build/pages/credits/credits.html',
  directives: [NavbarComponent]
})
export class CreditsPage implements OnInit{
  public creditsList: string[];
  constructor(public nav: NavController) {}

  ngOnInit(): void {
    this.creditsList = [
      {
        name: "Earth Clinic",
        url: "http://www.earthclinic.com/"
      }
    ];
  }
}
