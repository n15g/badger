import {Component, Input} from "@angular/core";
import {IBadge} from "coh-content-db";

@Component({
    selector: "badge-alignment-stacked",
    templateUrl: "./badge-alignment-stacked.component.html",
    styleUrls: ["./badge-alignment-stacked.component.scss"]
})
export class BadgeAlignmentStackedComponent {
    @Input() public badge: IBadge;
}
