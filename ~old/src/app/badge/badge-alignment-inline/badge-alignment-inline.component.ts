import {Component, Input} from "@angular/core";
import {IBadge} from "coh-content-db";

@Component({
    selector: "badge-alignment-inline",
    templateUrl: "./badge-alignment-inline.component.html",
    styleUrls: ["./badge-alignment-inline.component.scss"]
})
export class BadgeAlignmentInlineComponent {
    @Input() public badge: IBadge;
}
