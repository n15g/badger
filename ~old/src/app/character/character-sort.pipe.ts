import {Pipe, PipeTransform} from "@angular/core";
import * as _ from "lodash";
import {ICharacter} from "./character";
import {oc} from "ts-optchain";

@Pipe({
    name: "characterSort"
})
export class CharacterSortPipe implements PipeTransform {

    transform(value: ICharacter[], args?: any): ICharacter[] {
        return _(value)
            .sortBy([
                (character) => oc(character).name().toLowerCase()
            ]).value();
    }
}
