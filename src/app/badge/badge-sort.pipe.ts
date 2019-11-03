import {Pipe, PipeTransform} from '@angular/core';
import {IBadge} from 'coh-content-db';
import * as _ from 'lodash';
import {BadgeNamePipe} from './badge-name.pipe';
import {oc} from 'ts-optchain';

@Pipe({
    name: 'badgeSort'
})
export class BadgeSortPipe implements PipeTransform {

    constructor(private badgeNamePipe: BadgeNamePipe) {
    }

    public transform<T extends IBadge>(badges: T[], sort?: BadgeSortType, direction?: BadgeSortDirection): T[] {
        switch (sort) {
            case BadgeSortType.CANONICAL:
                return direction === BadgeSortDirection.ASC ? badges : _.reverse(badges);

            case BadgeSortType.NAME:
                const nameSorted = _.sortBy(badges, badge => this.badgeNamePipe.transform(badge));
                return direction === BadgeSortDirection.ASC ? nameSorted : _.reverse(nameSorted);

            case BadgeSortType.MAP:
                const mapSorted = _.sortBy(badges, badge => oc(badge.serverGroup.getMap(badge.mapKey)).name('ZZZ'));
                return direction === BadgeSortDirection.ASC ? mapSorted : _.reverse(mapSorted);

            default:
                return badges;
        }
    }
}

export enum BadgeSortType {
    CANONICAL = 'CANONICAL',
    NAME = 'NAME',
    MAP = 'MAP'
}

export enum BadgeSortDirection {
    ASC= 'ASC',
    DESC = 'DESC'
}
