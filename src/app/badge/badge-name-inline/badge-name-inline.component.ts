import {Component, Input} from "@angular/core";
import {IBadge} from "coh-content-db";

@Component({
    selector: "badge-name-inline",
    templateUrl: "./badge-name-inline.component.html",
    styleUrls: ["./badge-name-inline.component.scss"]
})
export class BadgeNameInlineComponent {
    @Input() public badge: IBadge;
}
