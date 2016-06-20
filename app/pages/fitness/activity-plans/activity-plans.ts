import { Component, OnInit } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';
import { Modal, NavController, NavParams } from 'ionic-angular';
import { MD_TOOLBAR_DIRECTIVES } from '@angular2-material/toolbar';
import { MATERIAL_DIRECTIVES } from 'ng2-material';

import { Activity, ActivityPlan, ActivityPlanService } from './shared';
import { ActivityAddPage } from './activity-add/activity-add';
import { NavbarComponent } from '../../../components';

@Component({
    templateUrl: 'build/pages/fitness/activity-plans/activity-plans.html',
    directives: [CORE_DIRECTIVES, MATERIAL_DIRECTIVES, MD_TOOLBAR_DIRECTIVES, NavbarComponent]
})
export class ActivityPlansPage implements OnInit {
    private _activityPlans: any;
    public currentDate: string;
    public currentActivityPlan: ActivityPlan;
    public editing: boolean = false;
    constructor(private _activityPlanService: ActivityPlanService, private _nav: NavController) { }

    private updateActivityPlan(): void {
        this.currentActivityPlan.activities.forEach(activity => activity.energy = this._activityPlanService.calculateActivityEnergy(activity));
        let totalActivity = this._activityPlanService.calculateTotalActivity(this.currentActivityPlan.activities);
        this.currentActivityPlan.totalEnergy = totalActivity.totalEnergy;
        this.currentActivityPlan.totalDuration = totalActivity.totalDuration;
        this._activityPlanService.updateActivityPlan(this.currentActivityPlan);
    }

    public searchActivity(): void {
        let activitySearchModal = Modal.create(ActivityAddPage, { activities: this.currentActivityPlan.activities });
        activitySearchModal.onDismiss(activities => {
            this.currentActivityPlan.activities = activities;
            this.updateActivityPlan();
        });
        this._nav.present(activitySearchModal);
    }

    public removeActivity(activityIndex: number): void {
        this.currentActivityPlan.activities.splice(activityIndex, 1);
    }

    public editActivityPlan(): void {
        if (this.editing) {
            this.updateActivityPlan();
            this.editing = false;
        } else {
            this.editing = true;
        }
    }

    public syncActivityPlan() {
        this.currentActivityPlan = new ActivityPlan(this.currentDate);
        this._activityPlans
            .subscribe(activityPlans => {
                activityPlans.forEach(activityPlan => {
                    if (activityPlan.date == this.currentDate) {
                        this.currentActivityPlan['$key'] = activityPlan['$key'];
                        if (!!activityPlan.activities) {
                            this.currentActivityPlan.activities = activityPlan.activities;
                            this.currentActivityPlan.totalEnergy = activityPlan.totalEnergy;
                            this.currentActivityPlan.totalDuration = activityPlan.totalDuration;
                        }
                    }
                });
            });
        setTimeout(() => {
            if (!this.currentActivityPlan['$key']) {
                this._activityPlanService.addActivityPlan(this.currentDate);
            }
        }, 1000);
    }

    ngOnInit() {
        this._activityPlans = this._activityPlanService.getActivityPlans();
        let myDate = new Date(),
            currentDay = myDate.getDate(),
            currentMonth = myDate.getMonth() + 1,
            currentYear = myDate.getFullYear();
        this.currentDate = currentYear + '-' +
            ((currentMonth < 10) ? '0' + currentMonth : currentMonth) + '-' +
            ((currentDay < 10) ? '0' + currentDay : currentDay);
        this.syncActivityPlan();
    }

}