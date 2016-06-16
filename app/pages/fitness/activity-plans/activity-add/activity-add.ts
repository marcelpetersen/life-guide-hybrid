import { Component, OnInit } from '@angular/core';
import { Alert, NavController, NavParams, ViewController } from 'ionic-angular';

import { Activity, ActivityPlanService } from '../shared';
import { ItemSearchPipe } from '../../../shared';

@Component({
    templateUrl: 'build/pages/fitness/activity-plans/activity-add/activity-add.html',
    pipes: [ItemSearchPipe]
})
export class ActivityAddPage implements OnInit {
    activities: Activity[];
    searchQuery: string = '';
    selectedActivities: Activity[] = [];
    constructor(
        private _activityService: ActivityPlanService,
        private _nav: NavController,
        private _params: NavParams,
        private _viewCtrl: ViewController
    ) { }

    changeActivity(activity: Activity): void {
        let activityIndex = this.selectedActivities.indexOf(activity);
        if (activityIndex !== -1) {
            this.selectedActivities.splice(activityIndex, 1);
        } else {
            this.selectedActivities.push(activity);
        }
    }

    setActivityTime(event: any, activity: Activity): void {
        let activityIndex = this.selectedActivities.indexOf(activity);
        if (activityIndex !== -1) {
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
                            this.selectedActivities.splice(activityIndex, 1);
                        }
                    },
                    {
                        text: 'Save',
                        handler: data => {
                            activity.time = +data.duration;
                            activity.energy = this._activityService.calculateActivityEnergy(activity);
                        }
                    }
                ]
            });
            this._nav.present(durationModal);
        }
    }

    doneAdding(): void {
        this.selectedActivities.forEach(activity => {
            if (activity.hasOwnProperty('$key')) {
                delete activity['$key'];
            }
        });
        this._viewCtrl.dismiss(this.selectedActivities);
    }

    cancelAdd(): void {
        this._viewCtrl.dismiss();
    }

    ngOnInit() {
        this._activityService.getActivities().subscribe(activities => this.activities = activities);
        if (!!this._params.data.activities) {
            this.selectedActivities = this._params.data.activities;
        }
    }

}