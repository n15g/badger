import {Pipe, PipeTransform} from "@angular/core";
import * as _ from "lodash";
import {ICharacter} from "./character";

@Pipe({
    name: "characterSort"
})
export class CharacterSortPipe implements PipeTransform {

    transform(value: ICharacter[], args?: any): ICharacter[] {
        return _(value)
            .sortBy([
                "name"
            ]).value();
    }
}
