import {Component, OnInit} from "@angular/core";
import {ContentDbService} from "../content-db/content-db.service";
import {IServerGroup} from "coh-content-db";

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
    public serverGroups: IServerGroup[];

    constructor(private contentDb: ContentDbService) {
    }

    public ngOnInit(): void {
        this.serverGroups = this.contentDb.getServerGroups();
    }
}
