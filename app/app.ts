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


import { DiagnosisPage } from './pages/diagnosis/diagnosis';
import { FitnessPage } from './pages/fitness/fitness';
import { FoodListPage, FoodService } from './pages/food';
import { HomePage } from './pages/home/home';
import { NutrientListPage, NutrientService } from './pages/nutrients';
import { RecipesPage } from './pages/recipes/recipes';



@Component({
  templateUrl: 'build/app.html',
  providers: [
    FoodService,
    NutrientService,
    FIREBASE_PROVIDERS,
    defaultFirebase('https://life-guiderta.firebaseio.com')
  ]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = HomePage;
  pages: Array<{title: string, icon: string, component: any}>

  constructor(platform: Platform) {
    platform.ready().then(() => StatusBar.styleDefault());
    this.pages = [
      { title: 'Diagnosis', icon: 'pulse', component: DiagnosisPage },
      { title: 'Fitness', icon: 'bicycle', component: FitnessPage },
      { title: 'Food', icon: 'cart', component: FoodListPage },
      { title: 'Home', icon: 'home', component: HomePage },
      { title: 'Nutrients', icon: 'nutrition', component: NutrientListPage },
      { title: 'Recipes', icon: 'restaurant', component: RecipesPage }
    ];
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}

ionicBootstrap(MyApp);

