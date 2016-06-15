import { Activity } from './activity.model';

export class ActivityPlan {
    constructor(
        public date: string = "",
        public activities: Activity[] = []
        ) { }
}