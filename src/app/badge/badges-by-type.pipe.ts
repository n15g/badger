import {Pipe, PipeTransform} from "@angular/core";
import {IBadge} from "coh-content-db";
import * as _ from 'lodash';
import {BadgeSortType} from "./badge-sort.pipe";

@Pipe({
    name: "badgesByType"
})
export class BadgesByTypePipe implements PipeTransform {

    public transform<T extends IBadge>(badges: T[], sort?: BadgeSortType): { [id: string]: T[] } {
        return _.groupBy(badges, "type");
    }
}

