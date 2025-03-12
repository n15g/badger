import {Pipe, PipeTransform} from "@angular/core";
import * as _ from 'lodash';

@Pipe({
    name: "reverse"
})
export class ReversePipe implements PipeTransform {

    constructor() {
    }

    public transform<T>(items: Array<T>, page: number = 1, pageSize: number = 50): Array<T> {
        return _.reverse(items);
    }
}
