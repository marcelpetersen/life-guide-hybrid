import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'nutrition-tables',
    templateUrl: 'build/components/nutrition-tables/nutrition-tables.component.html'
})
export class NutritionTablesComponent implements OnInit {
    @Input() nutritionData: any;
    @Input() percentage: boolean = false;
    constructor() { }

    ngOnInit() { }

}