import { Component, ViewChild } from "@angular/core";
import { Platform, ionicBootstrap, Nav } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { 
  AngularFire,
  AuthMethods,
  AuthProviders,
  defaultFirebase,
  firebaseAuthConfig,
  FIREBASE_PROVIDERS
} from 'angularfire2';

import { FitnessPage } from './pages/fitness/fitness'
import { HomePage } from './pages/home/home';
import { NutrientsPage } from './pages/nutrients/nutrients';
import { RecipesPage } from './pages/recipes/recipes';



@Component({
  templateUrl: 'build/app.html',
  providers: [
    FIREBASE_PROVIDERS,
    defaultFirebase('https://life-guiderta.firebaseio.com')
  ]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = HomePage;
  pages: Array<{title: string, component: any}>

  constructor(platform: Platform) {
    platform.ready().then(() => StatusBar.styleDefault());
    this.pages = [
      { title: 'Fitness', component: FitnessPage },
      { title: 'Home', component: HomePage },
      { title: 'Nutrients', component: NutrientsPage },
      { title: 'Recipes', component: RecipesPage }
    ];
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}

ionicBootstrap(MyApp);

