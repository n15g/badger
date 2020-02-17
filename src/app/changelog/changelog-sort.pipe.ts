import {Pipe, PipeTransform} from '@angular/core';
import {map} from 'lodash';
import * as semverCompare from 'semver-compare';

@Pipe({
    name: 'changelogSort'
})
export class ChangelogSortPipe implements PipeTransform {

    transform(value: { [id: string]: string }, args?: any): string[][] {
        const values = map(value, (text, ver) => [ver, text]);

        return values.sort((a, b) => semverCompare(b[0], a[0]));
    }
}
