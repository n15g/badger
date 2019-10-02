import {Pipe, PipeTransform} from "@angular/core";
import * as _ from 'lodash';

@Pipe({
    name: "page"
})
export class PagePipe implements PipeTransform {

    constructor() {
    }

    public transform<T>(items: Array<T>, page: number = 1, pageSize: number = 50): Array<T> {
        if (!pageSize) {
            return items;
        }

        return _(items)
            .drop((page - 1) * pageSize)
            .slice(0, pageSize)
            .value();
    }
}
