import {Component, Input, OnInit, ViewEncapsulation} from "@angular/core";
import * as _ from "lodash";
import {IBadge} from "coh-content-db";

@Component({
    selector: "badge-list",
    templateUrl: "./badge-list.component.html",
    styleUrls: ["./badge-list.component.scss"],
    encapsulation: ViewEncapsulation.None
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
