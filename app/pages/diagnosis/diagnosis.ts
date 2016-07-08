import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { DemoDirective } from './demo-directive.ts';
import { NavbarComponent } from '../../components';

@Component({
  templateUrl: 'build/pages/diagnosis/diagnosis.html',
  directives: [DemoDirective, NavbarComponent]
})
export class DiagnosisPage {
  constructor(private _nav: NavController) {}
}
