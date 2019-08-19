import {Component} from "@angular/core";
import {ContentDbService} from "../content-db/content-db.service";
import {IBadgeSet} from "../content-db/badge-set/badge-set.interface";

@Component({
    selector: "app-main-nav",
    templateUrl: "./main-nav.component.html",
    styleUrls: ["./main-nav.component.scss"]
})
export class MainNavComponent {
    public badgeSets: IBadgeSet[];

    constructor(contentDbService: ContentDbService) {
        this.badgeSets = contentDbService.getBadgeSets();
    }
}
