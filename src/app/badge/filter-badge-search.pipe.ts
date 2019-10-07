import {Pipe, PipeTransform} from "@angular/core";
import {IBadge} from "coh-content-db";
import * as _ from 'lodash';

@Pipe({
    name: "filterBadgeSearch"
})
export class FilterBadgeSearchPipe implements PipeTransform {

    public transform<T extends IBadge>(badges: T[], query?: string): T[] {
        return query ? _.filter(badges, (badge) => {
            return _.some(badge.names, (name) => ("" + name.value).toLowerCase().includes(query.toLowerCase()));
        }) : badges;
    }
}
