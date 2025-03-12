import {Pipe, PipeTransform} from "@angular/core";
import {IBadge} from "coh-content-db";
import * as _ from 'lodash';

@Pipe({
    name: "filterBadgeMap"
})
export class FilterBadgeMapPipe implements PipeTransform {

    public transform<T extends IBadge>(badges: T[], mapKey?: string): T[] {
        return mapKey ? _.filter(badges, (badge) => {
            return badge.mapKey === mapKey
                || _.some(badge.partials, (partial) => partial.mapKey === mapKey);
        }) : badges;
    }
}
