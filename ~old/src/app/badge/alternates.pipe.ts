import {Pipe, PipeTransform} from "@angular/core";
import * as _ from "lodash";
import {Alternate, IAlternateValue} from "coh-content-db";

const MALE_CLASS = "male";
const FEMALE_CLASS = "female";
const HERO_CLASS = "hero";
const VILLAIN_CLASS = "villain";
const PRAETORIAN_CLASS = "praetorian";

const SORT_ORDER = [
    Alternate.H, Alternate.MH, Alternate.FH,
    Alternate.V, Alternate.MV, Alternate.FV,
    Alternate.P, Alternate.MP, Alternate.FP
];

@Pipe({
    name: "alternates"
})
export class AlternatesPipe implements PipeTransform {

    public transform(value: IAlternateValue[]): IAlternateWithClasses[] {

        return _(value)
            .sortBy(alternateName => {
                return _.indexOf(SORT_ORDER, alternateName.type);
            })
            .map(alternateName => {
                switch (alternateName.type) {
                    case Alternate.M:
                        return {...alternateName, classes: [MALE_CLASS]};
                    case Alternate.F:
                        return {...alternateName, classes: [FEMALE_CLASS]};
                    case Alternate.H:
                        return {...alternateName, classes: [HERO_CLASS]};
                    case Alternate.V:
                        return {...alternateName, classes: [VILLAIN_CLASS]};
                    case Alternate.P:
                        return {...alternateName, classes: [PRAETORIAN_CLASS]};
                    case Alternate.MH:
                        return {...alternateName, classes: [MALE_CLASS, HERO_CLASS]};
                    case Alternate.MV:
                        return {...alternateName, classes: [MALE_CLASS, VILLAIN_CLASS]};
                    case Alternate.MP:
                        return {...alternateName, classes: [MALE_CLASS, PRAETORIAN_CLASS]};
                    case Alternate.FH:
                        return {...alternateName, classes: [FEMALE_CLASS, HERO_CLASS]};
                    case Alternate.FV:
                        return {...alternateName, classes: [FEMALE_CLASS, VILLAIN_CLASS]};
                    case Alternate.FP:
                        return {...alternateName, classes: [FEMALE_CLASS, PRAETORIAN_CLASS]};
                    default:
                        return {...alternateName, classes: []};
                }
            })
            .value();
    }

}

export interface IAlternateWithClasses extends IAlternateValue {
    classes: string[]
}
