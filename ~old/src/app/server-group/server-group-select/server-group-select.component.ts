import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IServerGroup} from "coh-content-db";
import {ContentDbService} from "../../content-db/content-db.service";

@Component({
    selector: 'server-group-select',
    templateUrl: './server-group-select.component.html',
    styleUrls: ['./server-group-select.component.scss']
})
export class ServerGroupSelectComponent {
    @Output() public serverGroupChange = new EventEmitter();
    serverGroups: IServerGroup[];

    constructor(contentDb: ContentDbService) {
        this.serverGroups = contentDb.getServerGroups();
    }

    private _serverGroup: IServerGroup;

    @Input()
    public get serverGroup(): IServerGroup {
        return this._serverGroup;
    }

    public set serverGroup(value: IServerGroup) {
        this._serverGroup = value;
        this.serverGroupChange.emit(value);
    }
}
