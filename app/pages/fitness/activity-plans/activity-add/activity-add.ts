import { Component, OnInit } from '@angular/core';
import { Alert, NavController, NavParams, ViewController } from 'ionic-angular';
import { FirebaseListObservable } from 'angularfire2';

import { Activity, ActivityPlanService } from '../shared';
import { ItemSearchPipe } from '../../../shared';

@Component({
    templateUrl: 'build/pages/fitness/activity-plans/activity-add/activity-add.html',
    pipes: [ItemSearchPipe]
})
export class ActivityAddPage implements OnInit {
    public activities: FirebaseListObservable<Activity[]>;
    public searchQuery: string = '';
    public selectedActivities: Activity[] = [];
    constructor(
        private _activityService: ActivityPlanService,
        private _nav: NavController,
        private _params: NavParams,
        private _viewCtrl: ViewController
    ) { }

    public cancelAdd(): void {
        this._viewCtrl.dismiss();
    }

    public doneAdding(): void {
        this._viewCtrl.dismiss(this.selectedActivities);
    }

    public setActivity(event: any, activity: Activity): void {
        let activityIndex = this.selectedActivities.indexOf(activity);
        if (activityIndex === -1) {
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
                            this.selectedActivities.push(activity);
                        }
                    }
                ]
            });
            this._nav.present(durationModal);
        } else {
            this.selectedActivities.splice(activityIndex, 1);
        }
    }

    ngOnInit() {
        this.activities = this._activityService.getActivities();
    }

}