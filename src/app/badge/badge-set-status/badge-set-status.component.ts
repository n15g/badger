import {Component, Input} from '@angular/core';
import {BadgeSetStatus} from "../../content-db/badge-set/badge-set-status.enum";

@Component({
    selector: 'app-badge-set-status',
    templateUrl: './badge-set-status.component.html',
    styleUrls: ['./badge-set-status.component.scss']
})
export class BadgeSetStatusComponent {
    @Input() public status: BadgeSetStatus;

    public getClass() {
        switch (this.status) {
            case BadgeSetStatus.INCOMPLETE:
                return "badge-warning";
            case BadgeSetStatus.SUNSET:
                return "badge-danger";
            default:
                return "badge-secondary";
        }
    }

    public getTitle() {
        switch (this.status) {
            case BadgeSetStatus.INCOMPLETE:
                return "This badge set is currently missing content";
            case BadgeSetStatus.SUNSET:
                return "This badge set is part of a codebase that has reached end-of-life.";
            default:
                return "";
        }
    }
}
