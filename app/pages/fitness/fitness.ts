import { Component, OnInit } from '@angular/core';

import { ActivityPlansPage } from './activity-plans/activity-plans';
import { MealPlansPage } from './meal-plans';
import { ProfilePage } from './profile/profile';

@Component({
    templateUrl: 'build/pages/fitness/fitness.html'
})
export class FitnessPage implements OnInit {
    constructor() { 
        this.activityPlansTab = ActivityPlansPage;
        this.mealPlansTab = MealPlansPage;
        this.fitnesProfileTab = ProfilePage;
     }

    ngOnInit() { }

}