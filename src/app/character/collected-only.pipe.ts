import {Pipe, PipeTransform} from "@angular/core";
import * as _ from "lodash";
import {ICharacterBadge} from "./character-badges.pipe";

@Pipe({
    name: "collectedOnly"
})
export class CollectedOnlyPipe implements PipeTransform {

    transform(value: ICharacterBadge[]): ICharacterBadge[] {
        return _.filter(value, value => !!value.owned);
    }
}
