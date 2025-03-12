import {Component, Input} from '@angular/core';
import {IServerGroup} from "coh-content-db";

@Component({
    selector: 'server-group-statuses',
    templateUrl: './server-group-statuses.component.html',
    styleUrls: ['./server-group-statuses.component.scss']
})
export class ServerGroupStatusesComponent {
    @Input() public serverGroup: IServerGroup;
}
