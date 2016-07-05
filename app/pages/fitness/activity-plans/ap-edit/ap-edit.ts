import { Component, OnInit } from '@angular/core';
import { CORE_DIRECTIVES, NgForm } from '@angular/common';
import { Modal, NavController, NavParams, Toast, ViewController } from 'ionic-angular';

import { Activity, ActivityPlan, ActivityPlanService } from '../shared';
import { ActivityAddPage } from '../activity-add/activity-add';

@Component({
    templateUrl: 'build/pages/fitness/activity-plans/ap-edit/ap-edit.html',
    directives: [CORE_DIRECTIVES, NgForm]
})
export class ApEditPage implements OnInit {
    public activityPlan: ActivityPlan;
    public durationView: boolean = true;
    constructor(
        private _activityPlanService: ActivityPlanService,
        private _nav: NavController,
        private _params: NavParams,
        private _viewCtrl: ViewController
    ) { }

    public cancelAp(): void {
        this._viewCtrl.dismiss();
    }

    public createap(): void {
        if (!this.activityPlan.date) {
            const toast = Toast.create({
                message: 'Please enter the date!',
                showCloseButton: true,
                closeButtonText: 'Ok'
            });
            this._nav.present(toast);
        } else if (!this.activityPlan.activities.length) {
            const toast = Toast.create({
                message: 'Please enter at least one activity!',
                showCloseButton: true,
                closeButtonText: 'Ok'
            });
            this._nav.present(toast);
        } else {
            this.activityPlan.activities.forEach(activity => activity.energy = this._activityPlanService.getEnergyExpand(activity));
            let totalActivity = this._activityPlanService.getEnergyDuration(this.activityPlan.activities);
            this.activityPlan.totalEnergy = totalActivity.totalEnergy;
            this.activityPlan.totalDuration = totalActivity.totalDuration;
            this._viewCtrl.dismiss(this.activityPlan);
        }
    }

    public changeActivityView(): void {
        this.durationView = !this.durationView;
    }

    public searchActivity(): void {
        let activitySearchModal = Modal.create(ActivityAddPage, { activities: this.activityPlan.activities });
        activitySearchModal.onDismiss(activities => {
            this.activityPlan.activities = activities;
        });
        this._nav.present(activitySearchModal);
    }

    public removeActivity(index: number): void {
        this.activityPlan.activities.splice(index, 1);
    }

    ngOnInit() {
        this.activityPlan = this._params.data.activityPlan;
    }

}