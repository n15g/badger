import {Component, Input} from '@angular/core';
import {IBadge} from "coh-content-db";

@Component({
    selector: 'badge-link',
    templateUrl: './badge-link.component.html',
    styleUrls: ['./badge-link.component.scss']
})
export class BadgeLinkComponent {
    @Input() public badge: IBadge;

    constructor() {
    }
}
