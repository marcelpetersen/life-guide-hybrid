import { Component, OnInit } from '@angular/core';
import { CORE_DIRECTIVES, NgForm } from '@angular/common';
import { Alert, Modal, NavController, NavParams, Toast, ViewController } from 'ionic-angular';

import { Activity, ActivityPlan, ActivityPlanService } from '../shared';
import { ActivityAddPage } from '../activity-add/activity-add';
import { Profile, ProfileService } from '../../profile';

@Component({
    templateUrl: 'build/pages/fitness/activity-plans/ap-edit/ap-edit.html',
    directives: [CORE_DIRECTIVES, NgForm]
})
export class ApEditPage implements OnInit {
    private _activities: Activity[];
    private _fitnessProfile: Profile;
    public activityPlan: ActivityPlan;
    public durationView: boolean = true;
    constructor(
        private _activityPlanService: ActivityPlanService,
        private _nav: NavController,
        private _params: NavParams,
        private _profileService: ProfileService,
        private _viewCtrl: ViewController
    ) { }

    public cancelAp(): void {
        this._viewCtrl.dismiss();
    }

    public createAp(): void {
        if (!this.activityPlan.date) {
            const toast = Toast.create({
                message: 'Please enter the date!',
                showCloseButton: true,
                closeButtonText: 'Ok'
            });
            this._nav.present(toast);
        } else if (!this.activityPlan.activities || !this.activityPlan.activities.length) {
            const toast = Toast.create({
                message: 'Please enter at least one activity!',
                showCloseButton: true,
                closeButtonText: 'Ok'
            });
            this._nav.present(toast);
        } else {
            this.activityPlan.activities.forEach(activity => activity.energy = this._activityPlanService.getEnergyExpand(activity, this._fitnessProfile.weight));
            let totalActivity = this._activityPlanService.getEnergyDuration(this.activityPlan.activities, this._fitnessProfile.weight);
            this.activityPlan.totalEnergy = totalActivity.totalEnergy;
            this.activityPlan.totalDuration = totalActivity.totalDuration;
            this._viewCtrl.dismiss(this.activityPlan);
        }
    }

    public changeActivityView(): void {
        this.durationView = !this.durationView;
    }

    public changeDuration(activity: Activity): void {
        let durationModal = Alert.create({
            title: `${activity.name} (${activity.details})`,
            message: "Enter activity duration",
            inputs: [
                {
                    name: 'duration',
                    placeholder: 'Minutes',
                    type: 'number'
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                    handler: () => {
                        console.log('Canceled');
                    }
                },
                {
                    text: 'Save',
                    handler: data => {
                        activity.time = +data.duration;
                        activity.energy = this._activityPlanService.getEnergyExpand(activity, this._fitnessProfile.weight);
                    }
                }
            ]
        });
        this._nav.present(durationModal);
    }

    public changeEnergy(activity: Activity): void {
        let energyModal = Alert.create({
            title: `${activity.name} (${activity.details})`,
            message: "Enter energy consumption",
            inputs: [
                {
                    name: 'energy',
                    placeholder: 'Kilocalories',
                    type: 'number'
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                    handler: () => {
                        console.log('Canceled');
                    }
                },
                {
                    text: 'Save',
                    handler: data => {
                        activity.time = this._activityPlanService.energyToTime(activity, +data.energy);
                        activity.energy = +data.energy;
                    }
                }
            ]
        });
        this._nav.present(energyModal);
    }

    public removeActivity(index: number): void {
        this.activityPlan.activities.splice(index, 1);
    }

    public searchActivity(): void {
        setTimeout(() => {
            let activitySearchModal = Modal.create(ActivityAddPage, { activities: this._activities });
            activitySearchModal.onDismiss(activities => {
                if (!this.activityPlan.hasOwnProperty('activities')) {
                    this.activityPlan.activities = [];
                }
                if (!!activities) {
                    activities.forEach(activity => {
                        if (activity.hasOwnProperty('$key')) {
                            delete activity['$key'];
                        }
                        if (this.activityPlan.activities.indexOf(activity) === -1) {
                            this.activityPlan.activities.push(activity);
                        }
                    });
                }
            });
            this._nav.present(activitySearchModal);
        }, 2000);
    }

    ngOnInit() {
        let myDate = new Date(),
            currentDay = myDate.getDate(),
            currentMonth = myDate.getMonth() + 1,
            currentYear = myDate.getFullYear();
        this.activityPlan = this._params.data.activityPlan;
        if (!this.activityPlan.date) {
            this.activityPlan.date = currentYear + '-' +
                ((currentMonth < 10) ? '0' + currentMonth : currentMonth) + '-' +
                ((currentDay < 10) ? '0' + currentDay : currentDay);
        }
        this._profileService.getMyProfile().subscribe(profile => this._fitnessProfile = profile);
        this._activityPlanService.getActivities().subscribe(activities => this._activities = activities);
    }

}