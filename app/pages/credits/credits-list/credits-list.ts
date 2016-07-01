import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { CreditsDetailsPage } from '../credits-details/credits-details';
import { CreditsService } from '../shared/credits.service';
import { NavbarComponent } from '../../../components';

@Component({
  templateUrl: 'build/pages/credits/credits-list/credits-list.html',
  directives: [NavbarComponent]
})
export class CreditsListPage implements OnInit{
  public creditsList: any[];
  constructor(private _creditsService: CreditsService, private _nav: NavController) {}

  public viewSource(source: any): void {
    this._nav.push(CreditsDetailsPage, { source });
  }

  ngOnInit(): void {
    this.creditsList = this._creditsService.getSources();
  }
}
