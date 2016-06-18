import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { Activity, ActivityPlan } from '../model';
import { AuthenticationService } from '../../../../authentication';

@Injectable()
export class ActivityPlanService {
    private _activities: FirebaseListObservable<Activity[]>;
    private _activityPlans: FirebaseListObservable<ActivityPlan[]>;
    constructor(private _af: AngularFire, private _authService: AuthenticationService) {
        this._activities = _af.database.list('/activities');
        this._authService.getAuth().subscribe(authData => {
            if (authData) {
                this._activityPlans = _af.database.list(`/activity-plans/${authData.uid}`);
            }
        });
    }

    public getActivities(): FirebaseListObservable<Activity[]> {
        return this._activities;
    }

    public getActivityPlans(): FirebaseListObservable<ActivityPlan[]> {
        return this._activityPlans;
    }

    public addActivityPlan(date: string): void {
        this._activityPlans.push(new ActivityPlan(date));
    }

    public updateActivityPlan(activityPlan: ActivityPlan): void {
        if (activityPlan['$key']) {
            this._activityPlans.update(activityPlan['$key'], {
                activities: activityPlan.activities,
                totalEnergy: activityPlan.totalEnergy,
                totalDuration: activityPlan.totalDuration
            });
        }

    }

    public calculateTotalActivity(activities: Activity[], weight: number = 70): any {
        let totalEnergy: number = 0,
            totalDuration: number = 0;
        activities.forEach(activity => {
            totalEnergy += Math.floor(0.0175 * activity.met * weight * activity.time);
            totalDuration += +activity.time;
        });
        return { totalEnergy, totalDuration };
    }

    public calculateActivityEnergy(activity: Activity, weight: number = 70): number {
        let totalEnergy = 0;
        totalEnergy += Math.floor(0.0175 * activity.met * weight * activity.time);
        return totalEnergy;
    };
}