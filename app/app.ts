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
import { MATERIAL_PROVIDERS } from "ng2-material";

import { AuthenticationPage, AuthenticationService } from './pages/authentication';
import { DiagnosisPage } from './pages/diagnosis/diagnosis';
import { ActivityPlanService, FitnessPage, MealPlansService, NutritionService } from './pages/fitness';
import { FoodListPage, FoodService } from './pages/food';
import { HomePage } from './pages/home/home';
import { NutrientListPage, NutrientService } from './pages/nutrients';
import { RecipeListPage, RecipeService } from './pages/recipes';


@Component({
  templateUrl: 'build/app.html',
  providers: [
    ActivityPlanService,
    AuthenticationService,
    FoodService,
    MealPlansService,
    NutrientService,
    NutritionService,
    RecipeService,
    FIREBASE_PROVIDERS,
    defaultFirebase({
      apiKey: "AIzaSyDCIDGR-i2jR0pyv2PCYot2ATDL0Xyd1-k",
      authDomain: "life-guiderta.firebaseapp.com",
      databaseURL: "https://life-guiderta.firebaseio.com",
      storageBucket: "life-guiderta.appspot.com"
    }),
    firebaseAuthConfig({
      provider: AuthProviders.Password,
      method: AuthMethods.Password,
      remember: 'sessionOnly'
    }),
    MATERIAL_PROVIDERS
  ]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  public rootPage: any = AuthenticationPage;
  public pages: Array<{ title: string, icon: string, component: any }>

  constructor(platform: Platform) {
    platform.ready().then(() => StatusBar.styleDefault());
    this.pages = [
      { title: 'Diagnosis', icon: 'pulse', component: DiagnosisPage },
      { title: 'Fitness', icon: 'bicycle', component: FitnessPage },
      { title: 'Food', icon: 'cart', component: FoodListPage },
      { title: 'Home', icon: 'home', component: HomePage },
      { title: 'Nutrients', icon: 'nutrition', component: NutrientListPage },
      { title: 'Recipes', icon: 'restaurant', component: RecipeListPage }
    ];
  }

  public openPage(page): void {
    this.nav.setRoot(page.component);
  }
}

ionicBootstrap(MyApp);

