import {Component} from "@angular/core";
import {ContentDbService} from "../content-db/content-db.service";
import {IServerGroup} from "coh-content-db";

@Component({
    selector: "app-main-nav",
    templateUrl: "./main-nav.component.html",
    styleUrls: ["./main-nav.component.scss"]
})
export class MainNavComponent {
    public serverGroups: IServerGroup[];

    constructor(contentDbService: ContentDbService) {
        this.serverGroups = contentDbService.getServerGroups();
    }
}
