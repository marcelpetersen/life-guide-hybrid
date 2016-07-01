import { Injectable } from '@angular/core';

@Injectable()
export class CreditsService {

    constructor() { }

    getSources(): any[] {
        return sources;
    }

}

const sources: any[] = [
    {
        name: "Earthclinic",
        urls: ["http://www.earthclinic.com/"]
    },
    {
        name: "B4Tea",
        urls: ["http://b4tea.com/food-health/natural-remedies-for-kidney-failure-problems/"]
    },
    {
        name: "Healthline",
        urls: ["http://www.healthline.com/health/skin-disorders"]
    },
    {
        name: "Mayoclinic",
        urls: ["http://www.healthline.com/"]
    }
];