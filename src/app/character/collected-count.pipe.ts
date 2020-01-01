import {Pipe, PipeTransform} from '@angular/core';
import * as _ from 'lodash';
import {ICharacterBadge} from './character-badges.pipe';

@Pipe({
    name: 'collectedCount'
})
export class CollectedCountPipe implements PipeTransform {

    transform(badges: ICharacterBadge[]): number {
        return _(badges).filter(value => !!value.owned)
            .filter(value => !value.ignoreInTotals)
            .value()
            .length;
    }
}
