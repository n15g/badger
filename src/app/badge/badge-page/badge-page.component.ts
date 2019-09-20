import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {IBadge, IServerGroup} from "coh-content-db";

@Component({
    selector: "badge-page",
    templateUrl: "./badge-page.component.html",
    styleUrls: ["./badge-page.component.scss"]
})
export class BadgePageComponent implements OnInit {

    public serverGroup: IServerGroup;
    public badge: IBadge;

    constructor(private route: ActivatedRoute, private title: Title) {
    }

    public ngOnInit() {
        this.route.data.subscribe(data => {
            this.serverGroup = data["serverGroup"];
            this.badge = data["badge"];
            this.title.setTitle(`${this.badge.canonicalName} | ${this.serverGroup.name} | Badger`);
        });
    }

}
