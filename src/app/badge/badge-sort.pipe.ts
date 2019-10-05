import {Pipe, PipeTransform} from "@angular/core";
import {IBadge} from "coh-content-db";
import * as _ from 'lodash';
import {BadgeNamePipe} from "./badge-name.pipe";

@Pipe({
    name: "badgeSort"
})
export class BadgeSortPipe implements PipeTransform {

    constructor(private badgeNamePipe: BadgeNamePipe) {
    }

    public transform(badges: IBadge[], sort?: BadgeSortType): IBadge[] {
        switch (sort) {
            case BadgeSortType.CANONICAL_DESC:
                return _.reverse(badges);

            case BadgeSortType.NAME_ASC:
            case BadgeSortType.NAME_DESC:
                const sorted = _.sortBy(badges, badge => this.badgeNamePipe.transform(badge));
                return sort === BadgeSortType.NAME_ASC ? sorted : _.reverse(sorted);

            default:
                return badges;
        }
    }
}

export enum BadgeSortType {
    CANONICAL_ASC = "CANONICAL_ASC",
    CANONICAL_DESC = "CANONICAL_DESC",
    NAME_ASC = "NAME_ASC",
    NAME_DESC = "NAME_DESC"
}
