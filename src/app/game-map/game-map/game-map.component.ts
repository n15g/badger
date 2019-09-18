import {Component, Input, OnChanges} from "@angular/core";
import {ContentDbService} from "../../content-db/content-db.service";
import {IGameMap} from "coh-content-db";

@Component({
    selector: "app-game-map",
    templateUrl: "./game-map.component.html",
    styleUrls: ["./game-map.component.scss"]
})
export class GameMapComponent implements OnChanges {
    @Input() public readonly serverGroupKey: string;
    @Input() public readonly mapKey: string;
    public map: IGameMap;

    constructor(private contentDb: ContentDbService) {
    }

    public ngOnChanges(): void {
        this.map = this.contentDb.getGameMap(this.serverGroupKey, this.mapKey);
    }
}
