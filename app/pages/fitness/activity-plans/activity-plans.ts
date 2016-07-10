import { Component, OnInit } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';
import { FirebaseListObservable } from 'angularfire2';
import { Modal, NavController, NavParams } from 'ionic-angular';

import { Activity, ActivityPlan, ActivityPlanService } from './shared';
import { ActivityAddPage } from './activity-add/activity-add';
import { ApEditPage } from './ap-edit/ap-edit';
import { ItemLimitPipe, ItemSearchPipe } from '../../shared';
import { NavbarComponent } from '../../../components';

@Component({
    templateUrl: 'build/pages/fitness/activity-plans/activity-plans.html',
    directives: [CORE_DIRECTIVES, NavbarComponent],
    pipes: [ItemLimitPipe, ItemSearchPipe]
})
export class ActivityPlansPage implements OnInit {
    public activityPlans: FirebaseListObservable<ActivityPlan[]>;
    public limitQuery: number = 10;
    public searchQuery: string = '';
    constructor(private _activityPlanService: ActivityPlanService, private _nav: NavController) { }

    public addActivityPlan(): void {
        let newAp: ActivityPlan = new ActivityPlan();
        let apAddModal = Modal.create(ApEditPage, { activityPlan: newAp });
        this._nav.present(apAddModal);
        apAddModal.onDismiss(activityPlan => {
            if (!!activityPlan) {
                this._activityPlanService.addAp(activityPlan);
            }
        });
    }

    public editAp(activityPlan: ActivityPlan): void {
        let apAddModal = Modal.create(ApEditPage, { activityPlan });
        this._nav.present(apAddModal);
        apAddModal.onDismiss(activityPlan => {
            if (!!activityPlan) {
                this._activityPlanService.updateAp(activityPlan);
            }
        });
    }

    public filterAp(event): void {
        this.searchQuery = event;
    }

    public loadMore(infiniteScroll) {
        setTimeout(() => {
            this.limitQuery += 5;
            infiniteScroll.complete();
        }, 500);
    }

    public removeAp(activityPlan: ActivityPlan): void {
        this._activityPlanService.removeAp(activityPlan);
    }

    ngOnInit() {
        this.activityPlans = this._activityPlanService.getActivityPlans();
    }

}