import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BadgeType} from "coh-content-db";
import * as _ from 'lodash';

@Component({
    selector: 'badge-type-select',
    templateUrl: './badge-type-select.component.html',
    styleUrls: ['./badge-type-select.component.scss']
})
export class BadgeTypeSelectComponent {
    public typeValue: BadgeType;
    @Output() public typeChange = new EventEmitter();

    types: BadgeType[] = _.values(BadgeType) as BadgeType[];

    constructor() {
    }

    @Input()
    public get type(): BadgeType {
        return this.typeValue;
    }

    public set type(value: BadgeType) {
        this.typeValue = value;
        this.typeChange.emit(value);
    }
}
