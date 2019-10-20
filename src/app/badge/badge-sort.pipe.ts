import {Pipe, PipeTransform} from "@angular/core";
import {IBadge} from "coh-content-db";
import * as _ from 'lodash';
import {BadgeNamePipe} from "./badge-name.pipe";
import {oc} from "ts-optchain";

@Pipe({
    name: "badgeSort"
})
export class BadgeSortPipe implements PipeTransform {

    constructor(private badgeNamePipe: BadgeNamePipe) {
    }

    public transform<T extends IBadge>(badges: T[], sort?: BadgeSortType): T[] {
        switch (sort) {
            case BadgeSortType.CANONICAL_DESC:
                return _.reverse(badges);

            case BadgeSortType.NAME_ASC:
            case BadgeSortType.NAME_DESC:
                const nameSorted = _.sortBy(badges, badge => this.badgeNamePipe.transform(badge));
                return sort === BadgeSortType.NAME_ASC ? nameSorted : _.reverse(nameSorted);

            case BadgeSortType.MAP_ASC:
            case BadgeSortType.MAP_DESC:
                const mapSorted = _.sortBy(badges, badge => oc(badge.serverGroup.getMap(badge.mapKey)).name("ZZZ"));
                return sort === BadgeSortType.MAP_ASC ? mapSorted : _.reverse(mapSorted);

            default:
                return badges;
        }
    }
}

export enum BadgeSortType {
    CANONICAL_ASC = "CANONICAL_ASC",
    CANONICAL_DESC = "CANONICAL_DESC",
    NAME_ASC = "NAME_ASC",
    NAME_DESC = "NAME_DESC",
    MAP_ASC = "MAP_ASC",
    MAP_DESC = "MAP_DESC",
}
