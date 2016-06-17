import { Component } from '@angular/core';
import { Alert, Loading, NavController } from 'ionic-angular';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'build/pages/authentication/authentication.html',
})
export class AuthenticationPage {
  private _loading: Loading;
  constructor(private _nav: NavController) {}

  private showError(message: string): void {
    this._loading.dismiss();
    let errorAlert = Alert.create({
      title: 'Login failed',
      subTitle: message,
      buttons: ['Ok']
    });
    this._nav.present(errorAlert);
  }

  private showLoading(): void {
    this._loading = Loading.create({
      content: 'Please wait...'
    });
    this._nav.present(this._loading);
  }

  public login(userCredentials: any): void {
    this.showLoading();
  }

  public register(userCredentials: any): void {

  }

  

}
