import { Component, OnInit } from '@angular/core';

import { ActivityPlansPage } from './activity-plans/activity-plans';
import { MealPlansPage } from './meal-plans';
import { ProfilePage } from './profile/profile';

@Component({
    templateUrl: 'build/pages/fitness/fitness.html'
})
export class FitnessPage implements OnInit {
    public activityPlansTab: any;
    public mealPlansTab: any;
    public fitnesProfileTab: any;
    constructor() { }

    ngOnInit(): void {
        this.activityPlansTab = ActivityPlansPage;
        this.mealPlansTab = MealPlansPage;
        this.fitnesProfileTab = ProfilePage;
     }

}