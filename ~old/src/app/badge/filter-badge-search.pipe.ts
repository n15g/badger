import {Pipe, PipeTransform} from "@angular/core";
import {IBadge} from "coh-content-db";
import * as _ from 'lodash';
import {oc} from "ts-optchain";

export type FilterBadgeSearchType = 'names' | 'badgeText';

@Pipe({
    name: "filterBadgeSearch"
})
export class FilterBadgeSearchPipe implements PipeTransform {

    public transform<T extends IBadge>(badges: T[], searchType: FilterBadgeSearchType = 'names', query?: string): T[] {
        if (query == undefined) return badges;

        return _.filter(badges, (badge) => {
            let result = _.some(badge.names, (name) => oc(name).value().toLowerCase().includes(query.toLowerCase()));


            if (searchType === 'badgeText') {
                return (badge.notes && badge.notes.toLowerCase().includes(query.toLowerCase()))
                    || _.some(badge.badgeText, (name) => oc(name).value().toLowerCase().includes(query.toLowerCase()))
                    || _.some(badge.partials || [], (partial) => (oc(partial).inscription() || '').toLowerCase().includes(query.toLowerCase()) || (oc(partial).notes() || '').toLowerCase().includes(query.toLowerCase()))
            }

            return result || _.some(badge.partials, (partial) => oc(partial).inventionLevel(0).toString() == query);
        });
    }
}