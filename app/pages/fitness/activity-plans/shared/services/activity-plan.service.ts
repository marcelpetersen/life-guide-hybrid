import { Injectable } from '@angular/core';
import { AngularFire, FirebaseAuth, FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/Rx';

import { Activity, ActivityPlan } from '../model';

@Injectable()
export class ActivityPlanService {
    private _activities: FirebaseListObservable<Activity[]>;
    private _activityPlans: FirebaseListObservable<ActivityPlan[]>;
    constructor(private _af: AngularFire, private _auth: FirebaseAuth) {
        this._activities = _af.database.list('/activities');
        this._auth.subscribe(authData => {
            if (authData) {
                this._activityPlans = _af.database.list(`/activity-plans/${authData.uid}`);
            }
        });
    }

    public getActivities(): FirebaseListObservable<Activity[]> {
        return this._activities;
    }

    public getAp(): FirebaseListObservable<ActivityPlan[]> {
        return this._activityPlans;
    }

    public addAp(ap: ActivityPlan): void {
        this._activityPlans.push(ap);
    }

    public updateAp(activityPlan: ActivityPlan): void {
        this._activityPlans.update(activityPlan['$key'], {
            activities: activityPlan.activities,
            totalEnergy: activityPlan.totalEnergy,
            totalDuration: activityPlan.totalDuration
        });
    }

    public removeAp(ap: ActivityPlan): void {
        this._activityPlans.remove(ap);
    }

    public getEnergyDuration(activities: Activity[], weight: number = 70): any {
        let totalEnergy: number = 0,
            totalDuration: number = 0;
        activities.forEach(activity => {
            totalEnergy += Math.floor(0.0175 * activity.met * weight * activity.time);
            totalDuration += +activity.time;
        });
        return { totalEnergy, totalDuration };
    }

    public getEnergyExpand(activity: Activity, weight: number = 70): number {
        let totalEnergy = 0;
        totalEnergy += Math.floor(0.0175 * activity.met * weight * activity.time);
        return totalEnergy;
    };
}