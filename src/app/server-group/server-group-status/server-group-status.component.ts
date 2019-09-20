import {Component, Input} from '@angular/core';
import {ServerGroupStatus} from "coh-content-db";

@Component({
    selector: 'server-group-status',
    templateUrl: './server-group-status.component.html',
    styleUrls: ['./server-group-status.component.scss']
})
export class ServerGroupStatusComponent {
    @Input() public status: ServerGroupStatus;

    public getClass() {
        switch (this.status) {
            case ServerGroupStatus.WORK_IN_PROGRESS:
                return "badge-warning";
            case ServerGroupStatus.SUNSET:
                return "badge-danger";
            default:
                return "badge-secondary";
        }
    }

    public getTitle() {
        switch (this.status) {
            case ServerGroupStatus.WORK_IN_PROGRESS:
                return "This badge set is currently missing content";
            case ServerGroupStatus.SUNSET:
                return "This badge set is part of a codebase that has reached end-of-life.";
            default:
                return "";
        }
    }

    public getText() {
        switch (this.status) {
            case ServerGroupStatus.WORK_IN_PROGRESS:
                return "Work in progress";
            case ServerGroupStatus.SUNSET:
                return "Sunset";
            default:
                return status;
        }
    }
}
