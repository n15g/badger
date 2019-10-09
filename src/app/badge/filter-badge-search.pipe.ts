import {Pipe, PipeTransform} from "@angular/core";
import {IBadge} from "coh-content-db";
import * as _ from 'lodash';
import {oc} from "ts-optchain";

@Pipe({
    name: "filterBadgeSearch"
})
export class FilterBadgeSearchPipe implements PipeTransform {

    public transform<T extends IBadge>(badges: T[], query?: string): T[] {
        if (query == undefined) return badges;

        return _.filter(badges, (badge) =>
            _.some(badge.names, (name) => oc(name).value().toLowerCase().includes(query.toLowerCase()))
            || _.some(badge.partials, (partial) => oc(partial).inventionLevel(0).toString() == query)
        );
    }
}
