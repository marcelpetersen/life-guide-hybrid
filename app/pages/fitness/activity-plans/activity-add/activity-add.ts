import { Component, OnInit } from '@angular/core';
import { Alert, NavController, NavParams, ViewController } from 'ionic-angular';
import { FirebaseListObservable } from 'angularfire2';

import { Activity, ActivityPlanService } from '../shared';
import { ItemLimitPipe, ItemSearchPipe } from '../../../shared';

@Component({
    templateUrl: 'build/pages/fitness/activity-plans/activity-add/activity-add.html',
    pipes: [ItemLimitPipe, ItemSearchPipe]
})
export class ActivityAddPage implements OnInit {
    public activities: FirebaseListObservable<Activity[]>;
    public limitQuery: number = 10;
    public searchQuery: string = '';
    public selectedActivities: Activity[] = [];
    constructor(
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

    public loadMore(infiniteScroll) {
        setTimeout(() => {
            this.limitQuery += 5;
            infiniteScroll.complete();
        }, 500);
    }

    public setActivity(activity: any, checkEl: any): void {
        let idx = this.selectedActivities.indexOf(activity);
        if (idx >= 0) {
            this.selectedActivities.splice(this.selectedActivities.indexOf(activity), 1);
        } else {
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
                            checkEl.checked = false;
                        }
                    },
                    {
                        text: 'Save',
                        handler: data => {
                            if (!!data.duration) {
                                activity.time = +data.duration;
                                this.selectedActivities.push(activity);
                            } else {
                                checkEl.checked = false;
                            }
                        }
                    }
                ]
            });
            this._nav.present(durationModal);
        }
    }

    ngOnInit() {
        this.activities = this._params.data.activities;
    }

}