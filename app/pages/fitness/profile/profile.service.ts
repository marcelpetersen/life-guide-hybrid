import { Injectable } from '@angular/core';
import { AngularFire, FirebaseAuth, FirebaseObjectObservable } from 'angularfire2';

import { Food } from '../../food';
import { INutrient, NutrientService } from '../../nutrients';
import { Profile } from './profile.model';

@Injectable()
export class ProfileService {
    private _macronutrients: INutrient[];
    private _micronutrients: INutrient[];
    private _profile: FirebaseObjectObservable<Profile>;
    constructor(private _af: AngularFire, private _auth: FirebaseAuth, private _nutrientService: NutrientService) {
        this._auth.subscribe(authData => {
            if (authData) {
                this._profile = _af.database.object(`/profiles/${authData.uid}`);
            }
        });
        this._nutrientService.getMacronutrients().subscribe(macronutrients => this._macronutrients = macronutrients);
        this._nutrientService.getMicronutrients().subscribe(micronutrients => this._micronutrients = micronutrients);
    }

    private _setAgeLabel(profile: Profile): string {
        let ageLabel: string = '';
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
        return ageLabel;
    };

    private _setBMR(profile: Profile): void {
        if (profile.gender === 'male') {
            profile.bmr = Math.floor(
                13.397 * profile.weight + 4.799 * profile.height - 5.677 * profile.age + 88.362
            );
        } else {
            profile.bmr = Math.floor(
                9.247 * profile.weight + 3.098 * profile.height - 4.33 * profile.age + 447.593
            );
        }
    };

    private _setBMI(profile: Profile): void {
        profile.bmi.data = +(10000 * profile.weight / Math.pow(profile.height, 2)).toFixed(2);
        if (profile.bmi.data > 25 || profile.bmi.data < 18) {
            profile.bmi.normal = false;
        } else {
            profile.bmi.normal = true;
        }
    }

    private _setBodyFat(profile: Profile): void {
        let bodyFatWeight: number = 0,
            leanBodyMass: number = 0;
        if (profile.gender === 'male') {
            leanBodyMass = (profile.weight * 2.205 * 1.082) + 94.42 - (profile.waist * 0.394 * 4.15);
            bodyFatWeight = (profile.weight * 2.205) - leanBodyMass;
            profile.fatPercentage.data = +((bodyFatWeight * 100) / (profile.weight * 2.205)).toFixed(2);
            if (profile.fatPercentage.data > 20 || profile.fatPercentage.data < 2) {
                profile.fatPercentage.normal = false;
            } else {
                profile.fatPercentage.normal = true;
            }
        } else {
            leanBodyMass = ((profile.weight * 2.205) * 0.732) + 8.987 +
                (profile.wrist * 0.394 / 3.14) -
                (profile.waist * 0.394 * 0.157) -
                (profile.hips * 0.394 * 0.249) +
                (profile.forearm * 0.434);
            bodyFatWeight = (profile.weight * 2.205) - leanBodyMass;
            profile.fatPercentage.data = +((bodyFatWeight * 100) / (profile.weight * 2.205)).toFixed(2);
            if (profile.fatPercentage.data < 0) {
                profile.fatPercentage.data = 0
            }
            if (profile.fatPercentage.data > 25 || profile.fatPercentage.data < 10) {
                profile.fatPercentage.normal = false;
            } else {
                profile.fatPercentage.normal = true;
            }
        }
    };

    private _setBasicMacroRequirements(nutrientRequirements: Food, profile: Profile): void {
        let ageLabel: string = this._setAgeLabel(profile);
        this._macronutrients.forEach(nutrient => {
            if (nutrient.hasOwnProperty('intake')) {
                if (nutrientRequirements.macronutrients.hasOwnProperty(nutrient.name)) {
                    // The macronutrient matches to the one we have in the macronutrients group
                    nutrientRequirements.macronutrients[nutrient.name] = (profile.gender === 'female')
                        ? nutrient.intake[profile.gender][profile.pregnancyStage][ageLabel]
                        : nutrient.intake[profile.gender][ageLabel];
                }
                if (nutrient.hasOwnProperty('classification')) {
                    // Check if the macronutrient has subgroups that we have in the macronutrients
                    // (e.g. "Monounsaturated fat" is a subgroup of "Fats")
                    nutrient.classification.forEach(nutrientType => {
                        if (nutrientType.hasOwnProperty('intake')) {
                            // Check if it has recommended intake
                            if (nutrientRequirements.macronutrients.hasOwnProperty(nutrientType.name)) {
                                nutrientRequirements.macronutrients[nutrientType.name] = (profile.gender === 'female')
                                    ? nutrientType.intake[profile.gender][profile.pregnancyStage][ageLabel]
                                    : nutrientType.intake[profile.gender][ageLabel];
                            }
                        }
                    });
                }
            } else if (nutrient.hasOwnProperty('classification')) {
                // The nutrient is divided in subgroups that maybe have intakes
                // (e.g. "Amino acids")
                let nutrientName = nutrient.name.toLowerCase();
                nutrient.classification.forEach(nutrientType => {
                    if (nutrientType.hasOwnProperty('intake')) {
                        // Check if it has recommended intake and if
                        // the current nutrient group matches to one we have
                        if (nutrientRequirements.macronutrients.hasOwnProperty(nutrientType.name)) {
                            nutrientRequirements.macronutrients[nutrientType.name] = (profile.gender === 'female')
                                ? nutrientType.intake[profile.gender][profile.pregnancyStage][ageLabel]
                                : nutrientType.intake[profile.gender][ageLabel];
                        } else if (nutrientRequirements.hasOwnProperty(nutrientName)
                            && nutrientRequirements[nutrientName].hasOwnProperty(nutrientType.name)) {
                            if (nutrientName === 'amino acids') {
                                nutrientRequirements[nutrientName][nutrientType.name] = (profile.gender === 'female')
                                    ? nutrientType.intake[profile.gender][profile.pregnancyStage][ageLabel] * profile.weight
                                    : nutrientType.intake[profile.gender][ageLabel] * profile.weight;
                            } else {
                                nutrientRequirements[nutrientName][nutrientType.name] = (profile.gender === 'female')
                                    ? nutrientType.intake[profile.gender][profile.pregnancyStage][ageLabel]
                                    : nutrientType.intake[profile.gender][ageLabel];
                            }

                        }
                    }
                });
            }
        });
        nutrientRequirements.macronutrients.Sugars = (profile.gender === 'female') ? 25 : 37.5;
    };

    private _setMicroRequirements(nutrientRequirements: Food, profile: Profile): void {
        let ageLabel: string = this._setAgeLabel(profile);
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

    private _setSpecificMacroRequirements(energyExpanditure: number, nutrientRequirements: Food, profile: Profile): void {
        let proteinEnergy: number = 4.1,
            fatEnergy: number = 9,
            carbEnergy: number = 4.1,
            sugarEnergy: number = 2.4,
            fiberEnergy: number = 2;
        nutrientRequirements.energy += energyExpanditure + profile.bmr;
        nutrientRequirements.energy = (profile.goal === 'lose weight')
            ? nutrientRequirements.energy - 400
            : (profile.goal === 'gain weight')
                ? nutrientRequirements.energy + 400
                : nutrientRequirements.energy;
        nutrientRequirements.macronutrients.Water = nutrientRequirements.energy;
        nutrientRequirements.macronutrients.Protein =
            nutrientRequirements.energy * profile.energyBalance.protein / proteinEnergy;
        nutrientRequirements.macronutrients.Carbohydrates =
            nutrientRequirements.energy * profile.energyBalance.carbohydrates / carbEnergy;
        nutrientRequirements.macronutrients.Fiber =
            nutrientRequirements.energy * profile.energyBalance.carbohydrates * 0.3 / fiberEnergy;
        nutrientRequirements.macronutrients.Sugars =
            nutrientRequirements.energy * profile.energyBalance.carbohydrates * 0.2 / sugarEnergy;
        nutrientRequirements.macronutrients.Sucrose = nutrientRequirements.macronutrients.Sugars / 6;
        nutrientRequirements.macronutrients.Fructose = nutrientRequirements.macronutrients.Sugars / 6;
        nutrientRequirements.macronutrients.Galactose = nutrientRequirements.macronutrients.Sugars / 6;
        nutrientRequirements.macronutrients.Maltose = nutrientRequirements.macronutrients.Sugars / 6;
        nutrientRequirements.macronutrients.Glucose = nutrientRequirements.macronutrients.Sugars / 6;
        nutrientRequirements.macronutrients.Lactose = nutrientRequirements.macronutrients.Sugars / 6;
        nutrientRequirements.macronutrients.Starch = (nutrientRequirements.macronutrients.Carbohydrates -
            nutrientRequirements.macronutrients.Sugars - nutrientRequirements.macronutrients.Fiber) / 11;
        nutrientRequirements.macronutrients.Fats = nutrientRequirements.energy * profile.energyBalance.fats / fatEnergy;
        nutrientRequirements.macronutrients['Saturated fat'] =
            nutrientRequirements.energy * 0.07 / fatEnergy;
        nutrientRequirements.sterols.Cholesterol = 300;
    };

    public addProfile(profile: Profile): void {
        this._profile.set(profile);
    }

    public updateProfile(profile: Profile): void {
        if (profile.hasOwnProperty('$key')) {
            delete profile['$key'];
        }
        this._profile.update(profile);
    }

    public getMyProfile(): FirebaseObjectObservable<Profile> {
        return this._profile;
    }

    public setFitness(profile: Profile): void {
        this._setBMR(profile);
        this._setBMI(profile);
        this._setBodyFat(profile);
    }

    public getTotalRequirements(energyExpand: number = 0, profile: Profile): Food {
        let nutrientRequirements: Food = new Food();
        this._setMicroRequirements(nutrientRequirements, profile);
        this._setBasicMacroRequirements(nutrientRequirements, profile);
        this._setSpecificMacroRequirements(energyExpand, nutrientRequirements, profile);
        return nutrientRequirements;
    }
}