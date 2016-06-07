import { Component } from "@angular/core";
import { Platform, ionicBootstrap } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { 
  FIREBASE_PROVIDERS,
  defaultFirebase,
  AngularFire,
  firebaseAuthConfig,
  AuthProviders,
  AuthMethods
} from 'angularfire2';

import { HomePage } from './pages/home/home';


@Component({
  templateUrl: 'build/app.html',
  providers: [
    FIREBASE_PROVIDERS,
    defaultFirebase('https://life-guiderta.firebaseio.com')
  ]
})
export class MyApp {
  rootPage: any = HomePage;

  constructor(platform: Platform) {
    platform.ready().then(() => StatusBar.styleDefault());
  }
}

ionicBootstrap(MyApp);

