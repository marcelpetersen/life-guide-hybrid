import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { NavbarComponent } from '../../components';

@Component({
  templateUrl: 'build/pages/credits/credits.html',
  directives: [NavbarComponent]
})
export class CreditsPage implements OnInit{
  public creditsList: any[];
  constructor(public nav: NavController) {}

  ngOnInit(): void {
    this.creditsList = [
      {
        name: "Earthclinic",
        url: "http://www.earthclinic.com/"
      },
      {
        name: "B4Tea",
        url: "http://b4tea.com/food-health/natural-remedies-for-kidney-failure-problems/"
      },
      {
        name: "Healthline",
        url: "http://www.healthline.com/health/skin-disorders"
      },
      {
        name: "Mayoclinic",
        url: "http://www.healthline.com/"
      }
    ];
  }
}
