import { Component, OnInit } from '@angular/core';
import { MD_TOOLBAR_DIRECTIVES } from '@angular2-material/toolbar';
import { MATERIAL_DIRECTIVES } from 'ng2-material';

import { Activity, ActivityPlan, ActivityPlanService } from './shared';

@Component({
    templateUrl: 'build/pages/fitness/activity-plans/activity-plans.html',
    directives: [MATERIAL_DIRECTIVES, MD_TOOLBAR_DIRECTIVES]
})
export class ActivityPlansPage implements OnInit {
    activityPlans: any;
    currentDate: string;
    currentActivityPlan: ActivityPlan;
    constructor(private _activityPlanService: ActivityPlanService) { }

    syncActivityPlan() {
        this.currentActivityPlan = new ActivityPlan(this.currentDate);
        this.activityPlans
            .subscribe(activityPlans => {
                activityPlans.forEach(activityPlan => {
                    if (activityPlan.date == this.currentDate) {
                        this.currentActivityPlan['$key'] = activityPlan['$key'];
                        if (!!activityPlan.meals) {
                            this.currentActivityPlan.activities = activityPlan.activities;
                        }
                    }
                });
            });
        setTimeout(() => {
            if (!this.currentActivityPlan['$key']) {
                this._activityPlanService.addActivityPlan(this.currentDate);
            }
        }, 3000);
    }

    ngOnInit() {
        this.activityPlans = this._activityPlanService.getActivityPlans();
        let myDate = new Date(),
            currentDay = myDate.getDate(),
            currentMonth = myDate.getMonth() + 1,
            currentYear = myDate.getFullYear();
        this.currentDate = currentYear + '-' +
            ((currentMonth < 10) ? '0' + currentMonth : currentMonth) + '-' +
            ((currentDay < 10) ? '0' + currentDay : currentDay);
        this.currentActivityPlan = new ActivityPlan(this.currentDate);
        this.syncActivityPlan();
    }

}