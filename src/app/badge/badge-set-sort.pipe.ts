import {Pipe, PipeTransform} from "@angular/core";
import * as _ from "lodash";
import {IBadgeSet} from "../content-db/badge-set/badge-set.interface";
import {BadgeSetStatus} from "../content-db/badge-set/badge-set-status.enum";

@Pipe({
    name: "badgeSetSort"
})
export class BadgeSetSortPipe implements PipeTransform {

    transform(value: IBadgeSet[], args?: any): IBadgeSet[] {
        return _(value)
            .sortBy([
                statusAmount,
                "name"
            ]).value();
    }
}

export function statusAmount(badgeSet: IBadgeSet) {
    return _(badgeSet.status).reduce((sigma, status) => {
        switch (status) {
            case BadgeSetStatus.INCOMPLETE:
                return sigma + 1;
            case BadgeSetStatus.SUNSET:
                return sigma + 2;
        }
        return sigma;
    }, 0);
}
