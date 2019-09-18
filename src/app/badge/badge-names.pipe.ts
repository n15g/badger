import {Pipe, PipeTransform} from "@angular/core";
import * as _ from "lodash";
import {oc} from "ts-optchain";
import {AlternateNameType, IAlternateName, IBadge} from "coh-content-db";

const BADGE_NAME_CLASS = "badge-name";
const MALE_CLASS = "male";
const FEMALE_CLASS = "female";
const HERO_CLASS = "hero";
const VILLAIN_CLASS = "villain";
const PRAETORIAN_CLASS = "praetorian";

const SORT_ORDER = [
    AlternateNameType.H, AlternateNameType.MH, AlternateNameType.FH,
    AlternateNameType.V, AlternateNameType.MV, AlternateNameType.FV,
    AlternateNameType.P, AlternateNameType.MP, AlternateNameType.FP
];

@Pipe({
    name: "badgeNames"
})
export class BadgeNamesPipe implements PipeTransform {

    public transform(value: IBadge, args?: any): IBadgeName[] {
        const alternateNames = oc(value).alternateNames([]);

        if (!alternateNames.length) {
            return [{type: null, value: value.canonicalName, classes: [BADGE_NAME_CLASS]}];
        }

        return _(alternateNames)
            .sortBy(alternateName => {
                return _.indexOf(SORT_ORDER, alternateName.type);
            })
            .map(alternateName => {
                switch (alternateName.type) {
                    case AlternateNameType.M:
                        return {...alternateName, classes: [BADGE_NAME_CLASS, MALE_CLASS]};
                    case AlternateNameType.F:
                        return {...alternateName, classes: [BADGE_NAME_CLASS, FEMALE_CLASS]};
                    case AlternateNameType.H:
                        return {...alternateName, classes: [BADGE_NAME_CLASS, HERO_CLASS]};
                    case AlternateNameType.V:
                        return {...alternateName, classes: [BADGE_NAME_CLASS, VILLAIN_CLASS]};
                    case AlternateNameType.P:
                        return {...alternateName, classes: [BADGE_NAME_CLASS, PRAETORIAN_CLASS]};
                    case AlternateNameType.MH:
                        return {...alternateName, classes: [BADGE_NAME_CLASS, MALE_CLASS, HERO_CLASS]};
                    case AlternateNameType.MV:
                        return {...alternateName, classes: [BADGE_NAME_CLASS, MALE_CLASS, VILLAIN_CLASS]};
                    case AlternateNameType.MP:
                        return {...alternateName, classes: [BADGE_NAME_CLASS, MALE_CLASS, PRAETORIAN_CLASS]};
                    case AlternateNameType.FH:
                        return {...alternateName, classes: [BADGE_NAME_CLASS, FEMALE_CLASS, HERO_CLASS]};
                    case AlternateNameType.FV:
                        return {...alternateName, classes: [BADGE_NAME_CLASS, FEMALE_CLASS, VILLAIN_CLASS]};
                    case AlternateNameType.FP:
                        return {...alternateName, classes: [BADGE_NAME_CLASS, FEMALE_CLASS, PRAETORIAN_CLASS]};
                    default:
                        return {...alternateName, classes: [BADGE_NAME_CLASS]};
                }
            })
            .value();
    }

}

export interface IBadgeName extends IAlternateName {
    classes: string[]
}
