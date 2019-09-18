import {Pipe, PipeTransform} from "@angular/core";
import * as _ from "lodash";
import {BadgeType} from "coh-content-db";

@Pipe({
    name: "badgeType"
})
export class BadgeTypePipe implements PipeTransform {

    public transform(value: BadgeType, args?: any): string {
        return _.startCase(_.lowerCase(_.replace(value, "_", " ")));
    }
}
