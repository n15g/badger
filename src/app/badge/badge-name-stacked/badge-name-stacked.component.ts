import {Component, Input} from "@angular/core";
import {IBadge} from "../../content-db/badge-set/badge.interface";


@Component({
    selector: "app-badge-name-stacked",
    templateUrl: "./badge-name-stacked.component.html",
    styleUrls: ["./badge-name-stacked.component.scss"]
})
export class BadgeNameStackedComponent {
    @Input() public badge: IBadge;
}
