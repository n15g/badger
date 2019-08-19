import {Component, OnInit} from "@angular/core";
import {ContentDbService} from "../content-db/content-db.service";
import {IBadgeSet} from "../content-db/badge-set/badge-set.interface";

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
    public badgeSets: IBadgeSet[];

    constructor(private contentDb: ContentDbService) {
    }

    public ngOnInit(): void {
        this.badgeSets = this.contentDb.getBadgeSets();
    }
}
