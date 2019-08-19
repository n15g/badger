import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {IBadgeSet} from "../../content-db/badge-set/badge-set.interface";
import {IBadge} from "../../content-db/badge-set/badge.interface";

@Component({
    selector: "app-badge-page",
    templateUrl: "./badge-page.component.html",
    styleUrls: ["./badge-page.component.scss"]
})
export class BadgePageComponent implements OnInit {

    public badgeSet: IBadgeSet;
    public badge: IBadge;

    constructor(private route: ActivatedRoute, private title: Title) {
    }

    public ngOnInit() {
        this.route.data.subscribe(data => {
            this.badgeSet = data["badgeSet"];
            this.badge = data["badge"];
            this.title.setTitle(`${this.badge.canonicalName} | ${this.badgeSet.name} | Badger`);
        });
    }

}
