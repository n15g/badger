import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AlignmentFilterType} from "../filter-badge-alignment.pipe";

@Component({
    selector: 'badge-alignment-select',
    templateUrl: './badge-alignment-select.component.html',
    styleUrls: ['./badge-alignment-select.component.scss']
})
export class BadgeAlignmentSelectComponent {
    @Output() public alignmentChange = new EventEmitter();
    alignments: typeof AlignmentFilterType = AlignmentFilterType;

    constructor() {
    }

    private _alignment: AlignmentFilterType;

    @Input()
    public get alignment(): AlignmentFilterType {
        return this._alignment;
    }

    public set alignment(value: AlignmentFilterType) {
        this._alignment = value;
        this.alignmentChange.emit(value);
    }
}
