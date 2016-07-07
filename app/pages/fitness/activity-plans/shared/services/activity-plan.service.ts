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

    public addAp(ap: ActivityPlan): void {
        this.getApDate(ap.date).then(res => {
            let key = res['$key'];
            res = ap;
            res['$key'] = key;
            this.updateAp(res);
        }, err => this._activityPlans.push(ap));
    }

    public getActivities(): FirebaseListObservable<Activity[]> {
        return this._activities;
    }

    public getActivityPlans(): FirebaseListObservable<ActivityPlan[]> {
        return this._activityPlans;
    }

    public getApDate(date: string): Promise<ActivityPlan> {
        return new Promise((resolve, reject) => {
            let found: boolean = false;
            this.getActivityPlans().subscribe(activityPlans => activityPlans.forEach((ap, index) => {
                if (ap.date === date) {
                    found = true;
                    resolve(ap);
                }
            }));
            setTimeout(() => {
                if (!found) {
                    reject('No activity plan found with this date');
                }
            }, 3000);
        });
    }

    public energyToTime(activity: Activity, energy: number = 70): number {
        return Math.floor((energy * activity.time) / activity.energy);
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
        return Math.floor(0.0175 * activity.met * weight * activity.time);
    };

    public removeAp(ap: ActivityPlan): void {
        this._activityPlans.remove(ap);
    }

    public updateAp(activityPlan: ActivityPlan): void {
        this._activityPlans.update(activityPlan['$key'], {
            activities: activityPlan.activities,
            totalEnergy: activityPlan.totalEnergy,
            totalDuration: activityPlan.totalDuration
        });
    }

}