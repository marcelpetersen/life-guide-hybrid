import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { NavbarComponent } from '../../components';

@Component({
  templateUrl: 'build/pages/diagnosis/diagnosis.html',
  directives: [NavbarComponent]
})
export class DiagnosisPage {
  constructor(private _nav: NavController) {}
}
