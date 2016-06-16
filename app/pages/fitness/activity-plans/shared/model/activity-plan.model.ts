import { Activity } from './activity.model';

export class ActivityPlan {
    constructor(
        public date: string = "",
        public activities: Activity[] = [],
        public totalEnergy: number = 0,
        public totalDuration: number = 0
        ) { }
}