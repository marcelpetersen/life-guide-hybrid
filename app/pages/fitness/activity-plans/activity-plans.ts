import { Component, OnInit } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';
import { Modal, NavController, NavParams } from 'ionic-angular';
import { MD_TOOLBAR_DIRECTIVES } from '@angular2-material/toolbar';
import { MATERIAL_DIRECTIVES } from 'ng2-material';

import { Activity, ActivityPlan, ActivityPlanService } from './shared';
import { ActivityAddPage } from './activity-add/activity-add';

@Component({
    templateUrl: 'build/pages/fitness/activity-plans/activity-plans.html',
    directives: [CORE_DIRECTIVES, MATERIAL_DIRECTIVES, MD_TOOLBAR_DIRECTIVES]
})
export class ActivityPlansPage implements OnInit {
    activityPlans: any;
    currentDate: string;
    currentActivityPlan: ActivityPlan;
    editing: boolean = false;
    constructor(private _activityPlanService: ActivityPlanService, private _nav: NavController) { }

    searchActivity(): void {
        let activitySearchModal = Modal.create(ActivityAddPage, { activities: this.currentActivityPlan.activities });
        activitySearchModal.onDismiss(activities => {
            this.currentActivityPlan.activities = activities;
            let totalActivity = this._activityPlanService.calculateTotalActivity(activities);
            this.currentActivityPlan.totalEnergy = totalActivity[0];
            this.currentActivityPlan.totalDuration = totalActivity[1];
            this._activityPlanService.updateActivityPlan(this.currentActivityPlan);

        });
        this._nav.present(activitySearchModal);
    }

    removeActivity(activityIndex: number): void {
        this.currentActivityPlan.activities.splice(activityIndex, 1);
    }

    editActivityPlan(): void {
        if (this.editing) {
            this._activityPlanService.updateActivityPlan(this.currentActivityPlan);
            this.editing = false;
        } else {
            this.editing = true;
        }
    }

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