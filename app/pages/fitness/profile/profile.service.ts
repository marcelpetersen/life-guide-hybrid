import { Injectable } from '@angular/core';
import { AngularFire, FirebaseAuth, FirebaseObjectObservable } from 'angularfire2';

import { Food } from '../../food';
import { INutrient, NutrientService } from '../../nutrients';
import { Profile } from './profile.model';

@Injectable()
export class ProfileService {
    private _macronutrients: INutrient[];
    private _micronutrients: INutrient[];
    private _profile: FirebaseObjectObservable<Profile[]>;
    constructor(private _af: AngularFire, private _auth: FirebaseAuth, private _nutrientService: NutrientService) {
        this._auth.subscribe(authData => {
            if (authData) {
                this._profile = _af.database.object(`/profiles/${authData.uid}`);
            }
        });
        this._nutrientService.getMacronutrients().subscribe(macronutrients => this._macronutrients = macronutrients);
        this._nutrientService.getMicronutrients().subscribe(micronutrients => this._micronutrients = micronutrients);
    }

    public getMyProfile(): FirebaseObjectObservable<Profile[]> {
        return this._profile;
    }

    public setAgeLabel(profile: Profile): void {
        let ageLabel = '';
        if (profile.infancy === 'yes') {
            ageLabel = (profile.age <= 6) ? "0-6 months" : "7-12 months";
        } else {
            ageLabel = (profile.age <= 3) ? "1-3 years"
                : (profile.age <= 8) ? "4-8 years"
                    : (profile.age <= 13) ? "9-13 years"
                        : (profile.age <= 18) ? "14-18 years"
                            : (profile.age <= 50) ? "19-50 years"
                                : (profile.age <= 70) ? "50-70 years"
                                    : "70+ years";
        }
    };

    public setMicronutrientRequirements(profile: Profile): void {
        let nutrientRequirements: Food;
        this._micronutrients.forEach(nutrient => {
            if (nutrientRequirements.vitamins.hasOwnProperty(nutrient.name)) {
                nutrientRequirements.vitamins[nutrient.name] = (profile.gender === 'female')
                    ? nutrient.intake[profile.gender][profile.pregnancyStage][ageLabel]
                    : nutrient.intake[profile.gender][ageLabel];
            } else if (nutrientRequirements.minerals.hasOwnProperty(nutrient.name)) {
                nutrientRequirements.minerals[nutrient.name] = (profile.gender === 'female')
                    ? nutrient.intake[profile.gender][profile.pregnancyStage][ageLabel]
                    : nutrient.intake[profile.gender][ageLabel];
            }
            if (nutrient.name === "Vitamin D") {
                nutrientRequirements.vitamins['Vitamin D3'] = nutrientRequirements.vitamins['Vitamin D2'] = (profile.gender === 'female')
                    ? nutrient.intake[profile.gender][profile.pregnancyStage][ageLabel] / 2
                    : nutrient.intake[profile.gender][ageLabel] / 2;
            }
        });
    };
}