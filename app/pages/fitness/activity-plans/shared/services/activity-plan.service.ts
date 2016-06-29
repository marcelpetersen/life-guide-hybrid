import { Injectable } from '@angular/core';
import { AngularFire, FirebaseAuth, FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
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

    public getActivities(): any {
        return new Promise(resolve => this._activities.subscribe(activities => resolve(activities)));
    }

    public getActivityPlans(date: string): Observable<any> {
        return new Observable(observer => {
            let ap;
            this._activityPlans.subscribe(activityPlans => ap = activityPlans.filter(activityPlan => activityPlan.date == date)[0]);
            setTimeout(() => {
                if (!ap) {
                    this.addActivityPlan(date);
                } else {
                    observer.next(ap);
                }
            }, 1000);
        });
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