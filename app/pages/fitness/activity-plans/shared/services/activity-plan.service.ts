import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { Activity, ActivityPlan } from '../model';

@Injectable()
export class ActivityPlanService {
    activities: FirebaseListObservable<Activity[]>;
    activityPlans: FirebaseListObservable<ActivityPlan[]>;
    constructor(af: AngularFire) {
        this.activities = af.database.list('/activities');
        this.activityPlans = af.database.list('/activity-plans');
    }

    getActivities(): FirebaseListObservable<Activity[]> {
        return this.activities;
    }

    getActivityPlans(): FirebaseListObservable<ActivityPlan[]> {
        return this.activityPlans;
    }

    addActivityPlan(date: string): void {
        this.activityPlans.push(new ActivityPlan(date));
    }

    updateMealPlan(activityPlan: ActivityPlan): void {
        if (activityPlan['$key']) {
            this.activityPlans.update(activityPlan['$key'], {
                activities: activityPlan.activities
            });
        }

    }
}