import { Component, Input, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'nutrition-tables',
    templateUrl: 'build/components/nutrition-tables/nutrition-tables.component.html'
})
export class NutritionTablesComponent implements OnInit {
    @Input() nutritionData: any;
    constructor() { }

    ngOnInit() { }

}