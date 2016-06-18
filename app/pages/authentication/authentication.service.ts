import { Injectable } from '@angular/core';
import { AngularFire, AuthMethods, AuthProviders, FirebaseAuth, FirebaseListObservable } from 'angularfire2';

@Injectable()
export class AuthenticationService {
    private _users: FirebaseListObservable<any[]>;
    constructor(private _af: AngularFire, private _auth: FirebaseAuth) {
        this._users = _af.database.list('/users');
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

    public registerUser(userCredentials: any): any {
        this._users.push(userCredentials);
        return this._auth.createUser(userCredentials);
    }

    public addUser(authData: any, userCredentials: any): void {
        console.log("Auth", authData, "Credentials", userCredentials);
        console.log(this._auth);
    }

}