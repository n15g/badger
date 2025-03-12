import {Component, Input} from '@angular/core';
import {IBadge} from "coh-content-db";

@Component({
    selector: 'badge-text',
    templateUrl: './badge-text.component.html',
    styleUrls: ['./badge-text.component.scss']
})
export class BadgeTextComponent {
    @Input() public badge: IBadge;

    constructor() {
    }
}
