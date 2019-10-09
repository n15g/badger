import {Pipe, PipeTransform} from "@angular/core";
import {IBadge} from "coh-content-db";
import * as _ from 'lodash';
import {oc} from "ts-optchain";

@Pipe({
    name: "filterBadgeAlignment"
})
export class FilterBadgeAlignmentPipe implements PipeTransform {

    public transform<T extends IBadge>(badges: T[], alignment?: AlignmentFilterType): T[] {
        return alignment ? _.filter(badges, (badge) => {
            switch (alignment) {
                case AlignmentFilterType.HERO:
                    return oc(badge).alignment.h() === true;
                case AlignmentFilterType.VILLAIN:
                    return oc(badge).alignment.v() === true;
                case AlignmentFilterType.PRAETORIAN:
                    return oc(badge).alignment.p() === true;
                default:
                    return true;
            }
        }) : badges;
    }
}

export enum AlignmentFilterType {
    HERO = "HERO",
    VILLAIN = "VILLAIN",
    PRAETORIAN = "PRAETORIAN"

}
