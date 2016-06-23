import { Component, Input, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
    selector: 'nutrition-tables',
    templateUrl: 'build/components/nutrition-tables/nutrition-tables.component.html',
    directives: [NgClass]
})
export class NutritionTablesComponent implements OnInit {
    @Input() nutritionData: any;
    @Input() percentage: boolean = false;
    constructor() { }

    ngOnInit() { }

}