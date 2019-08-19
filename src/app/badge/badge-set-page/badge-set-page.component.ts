import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {IBadgeSet} from "../../content-db/badge-set/badge-set.interface";

@Component({
    selector: "app-badge-set-page",
    templateUrl: "./badge-set-page.component.html",
    styleUrls: ["./badge-set-page.component.scss"]
})
export class BadgeSetPageComponent implements OnInit {

    public badgeSet: IBadgeSet;

    constructor(private route: ActivatedRoute, private title: Title) {
    }

    public ngOnInit() {
        this.route.data.subscribe(data => {
            this.badgeSet = data["badgeSet"];
            this.title.setTitle(`${this.badgeSet.name} | Badger`);
        });
    }
}
