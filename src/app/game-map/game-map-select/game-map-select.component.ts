import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IGameMap, IServerGroup} from "coh-content-db";
import {ContentDbService} from "../../content-db/content-db.service";

@Component({
    selector: 'game-map-select',
    templateUrl: './game-map-select.component.html',
    styleUrls: ['./game-map-select.component.scss']
})
export class GameMapSelectComponent implements OnInit {
    @Input()
    serverGroup: IServerGroup;

    mapKeyValue: string;

    @Output() public mapKeyChange = new EventEmitter();

    maps: IGameMap[];

    constructor(private contentDb: ContentDbService) {
    }

    @Input()
    public get mapKey(): string {
        return this.mapKeyValue;
    }

    public set mapKey(value: string) {
        this.mapKeyValue = value;
        this.mapKeyChange.emit(value);
    }

    ngOnInit(): void {
        this.maps = this.contentDb.getServerGroup(this.serverGroup.key).maps;
    }
}
