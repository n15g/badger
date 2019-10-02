import {Pipe, PipeTransform} from "@angular/core";
import {BadgeType, IBadge} from "coh-content-db";
import * as _ from 'lodash';

@Pipe({
    name: "filterBadgeType",
    pure: false
})
export class FilterBadgeTypePipe implements PipeTransform {

    public transform(badges: IBadge[], type?: BadgeType): IBadge[] {
        return type ? _.filter(badges, (badge) => badge.type === type) : badges;
    }
}
