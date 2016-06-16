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

    updateActivityPlan(activityPlan: ActivityPlan): void {
        if (activityPlan['$key']) {
            this.activityPlans.update(activityPlan['$key'], {
                activities: activityPlan.activities
            });
        }

    }

    calculateTotalActivity(activities: Activity[], weight: number = 70): any {
        let totalEnergy: number = 0,
            totalTime: number = 0;
        activities.forEach(activity => {
            totalEnergy += Math.floor(0.0175 * activity.met * weight * activity.time);
            totalTime += activity.time;
        });
        return { totalEnergy, totalTime };
    }

    calculateActivityEnergy(activity: Activity, weight: number = 70): number {
        let totalEnergy = 0;
        totalEnergy += Math.floor(0.0175 * activity.met * weight * activity.time);
        return totalEnergy;
    };
}