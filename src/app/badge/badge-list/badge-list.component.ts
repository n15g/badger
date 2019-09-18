import {Component, Input, OnInit} from "@angular/core";
import * as _ from "lodash";
import {IBadge} from "coh-content-db";

@Component({
    selector: "app-badge-list",
    templateUrl: "./badge-list.component.html",
    styleUrls: ["./badge-list.component.scss"]
})
export class BadgeListComponent implements OnInit {
    @Input() public badges: IBadge[];

    public filteredBadges: IBadge[];

    public ngOnInit(): void {
        this.updateList();
    }

    private updateList(): void {
        this.filteredBadges = _(this.badges)
            .value();
    }
}
