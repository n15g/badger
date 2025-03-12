import {Pipe, PipeTransform} from "@angular/core";
import {BadgePartialType, IBadgePartial} from "coh-content-db";
import * as _ from 'lodash';

@Pipe({
    name: "inventionPartials"
})
export class InventionPartialsPipe implements PipeTransform {

    public transform<T extends IBadgePartial>(partials: T[]): T[] {
        return _.filter(partials, (partial) => partial.type === BadgePartialType.INVENTION);
    }
}
