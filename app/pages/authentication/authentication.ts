import { Component, OnInit } from '@angular/core';
import { CORE_DIRECTIVES, NgForm } from '@angular/common'
import { Alert, Loading, NavController } from 'ionic-angular';
import { AngularFire, AuthMethods, AuthProviders, FirebaseAuth, FirebaseListObservable } from 'angularfire2';

import { HomePage } from '../home/home';

@Component({
  templateUrl: 'build/pages/authentication/authentication.html',
  directives: [CORE_DIRECTIVES]
})
export class AuthenticationPage implements OnInit {
  private _loading: Loading;
  public userLogin: boolean = true;
  constructor(private _af: AngularFire, private _auth: FirebaseAuth, private _nav: NavController) { }

  private showError(message: string): void {
    this._loading.dismiss()
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
    this._auth.createUser(userCredentials).then(authData => {
      this._loading.dismiss()
      let successAlert = Alert.create({
        title: "Success",
        subTitle: "Your new account has been created",
        buttons: [
          {
            text: 'Ok',
            handler: () => {
              setTimeout(() => this._nav.setRoot(HomePage), 1000);

            }
          }
        ]
      });
      this._nav.present(successAlert);
    }).catch(error => {
      this.showError(error);
    });
  }

  public googleLogin(): void {
    this.showLoading();
    this._auth.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Popup,
      remember: 'default'
    }).then(authData => {
      this._loading.dismiss()
      this._nav.setRoot(HomePage);
    }).catch(error => {
      this.showError(error);
    });
  }

  public passwordLogin(userCredentials: any): void {
    this.showLoading();
    this._auth.login(userCredentials).then(authData => {
      this._loading.dismiss();
      this._nav.setRoot(HomePage)
    }).catch(error => {
      this.showError(error);
    });
  }

  public changeAuthMethod(): void {
    this.userLogin = !this.userLogin;
  }

  ngOnInit(): void {
    
  }
}
