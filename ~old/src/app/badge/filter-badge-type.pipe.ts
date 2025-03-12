import {Pipe, PipeTransform} from "@angular/core";
import {BadgeType, IBadge} from "coh-content-db";
import * as _ from 'lodash';

@Pipe({
    name: "filterBadgeType"
})
export class FilterBadgeTypePipe implements PipeTransform {

    public transform<T extends IBadge>(badges: T[], type?: BadgeType): T[] {
        return type ? _.filter(badges, (badge) => badge.type === type) : badges;
    }
}
