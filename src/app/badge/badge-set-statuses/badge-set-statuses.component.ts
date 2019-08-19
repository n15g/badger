import {Component, Input} from '@angular/core';
import {IBadgeSet} from "../../content-db/badge-set/badge-set.interface";

@Component({
    selector: 'app-badge-set-statuses',
    templateUrl: './badge-set-statuses.component.html',
    styleUrls: ['./badge-set-statuses.component.scss']
})
export class BadgeSetStatusesComponent {
    @Input() public badgeSet: IBadgeSet;
}
