import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BadgeSortType} from "../badge-sort.pipe";

@Component({
    selector: 'badge-sort-select',
    templateUrl: './badge-sort-select.component.html',
    styleUrls: ['./badge-sort-select.component.scss']
})
export class BadgeSortSelectComponent {
    @Output() public sortChange = new EventEmitter();

    sortType: typeof BadgeSortType = BadgeSortType;

    constructor() {
    }

    public _sort: BadgeSortType;

    @Input()
    public get sort(): BadgeSortType {
        return this._sort;
    }

    public set sort(value: BadgeSortType) {
        this._sort = value;
        this.sortChange.emit(value);
    }
}
