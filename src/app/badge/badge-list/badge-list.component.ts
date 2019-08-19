import {Component, Input, OnInit} from "@angular/core";
import * as _ from "lodash";
import {IBadge} from "../../content-db/badge-set/badge.interface";

@Component({
    selector: "app-badge-list",
    templateUrl: "./badge-list.component.html",
    styleUrls: ["./badge-list.component.scss"]
})
export class BadgeListComponent implements OnInit {
    @Input() public badges: IBadge[];

    public orderedBadges: IBadge[];

    public ngOnInit(): void {
        this.updateList();
    }

    private updateList(): void {
        this.orderedBadges = _(this.badges)
            .sortBy(badge => badge.canonicalIndex)
            .value();
    }
}
