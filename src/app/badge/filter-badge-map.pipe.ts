import {Pipe, PipeTransform} from "@angular/core";
import {IBadge} from "coh-content-db";
import * as _ from 'lodash';

@Pipe({
    name: "filterBadgeMap",
    pure: false
})
export class FilterBadgeMapPipe implements PipeTransform {

    public transform(badges: IBadge[], mapKey?: string): IBadge[] {
        return mapKey ? _.filter(badges, (badge) => {
            return badge.mapKey === mapKey
                || _.some(badge.partials, (partial) => partial.mapKey === mapKey);
        }) : badges;
    }
}
