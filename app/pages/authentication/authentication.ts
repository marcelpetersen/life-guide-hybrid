import { Component } from '@angular/core';
import { CORE_DIRECTIVES, NgForm } from '@angular/common'
import { Alert, Loading, NavController } from 'ionic-angular';

import { AuthenticationService } from'./authentication.service';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'build/pages/authentication/authentication.html',
  directives: [CORE_DIRECTIVES]
})
export class AuthenticationPage {
  private _loading: Loading;
  public userLogin: boolean = true;
  constructor(private _authService: AuthenticationService, private _nav: NavController) {}

  private showError(message: string): void {
    setTimeout(() => {
      this._loading.dismiss();
    });
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

  public createAccount(userCredentials: any): void {
    this.showLoading();
    this._authService.registerUser(userCredentials).then(authData => {
      this._loading.dismiss();
      let successAlert = Alert.create({
        title: "Success",
        subTitle: "Your new account has been created",
        buttons: [
                    {
                        text: 'Ok',
                        handler: () => {
                            this._nav.setRoot(HomePage);
                            this._authService.addUser(authData, userCredentials);
                        }
                    }
                ]
      });
      this._nav.present(successAlert);
    }).catch(error => {
      this.showError(error);
    });
  }

  public login(userCredentials: any): void {
    this.showLoading();
    this._authService.loginUser(userCredentials).then(authData => {
      this._loading.dismiss();
      this._nav.setRoot(HomePage);
    }).catch(error => {
      this.showError(error);
    });
  }

  public register(): void {
    this.userLogin = false;
  }

  

}
