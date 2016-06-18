import { Injectable } from '@angular/core';
import { AngularFire, AuthMethods, AuthProviders, FirebaseAuth, FirebaseListObservable } from 'angularfire2';

@Injectable()
export class AuthenticationService {
    constructor(private _af: AngularFire, private _auth: FirebaseAuth) {
    }

    public getAuth(): any {
        return this._auth;
    }

    public loginGoogle(): any {
        return this._auth.login({
            provider: AuthProviders.Google,
            method: AuthMethods.Popup,
            remember: 'default'
        });
    }

    public loginUser(userCredentials: any): any {
        return this._auth.login(userCredentials);
    }

    public logoutUser(): void {
        this._auth.logout();
    }

    public registerUser(userCredentials: any): any {
        return this._auth.createUser(userCredentials);
    }

}