import {Pipe, PipeTransform} from "@angular/core";
import {BadgePartialType, IBadgePartial} from "coh-content-db";
import * as _ from 'lodash';

@Pipe({
    name: "inventionPartials"
})
export class InventionPartialsPipe implements PipeTransform {

    public transform(partials: IBadgePartial[]): IBadgePartial[] {
        return _.filter(partials, (partial) => partial.type === BadgePartialType.INVENTION);
    }
}
