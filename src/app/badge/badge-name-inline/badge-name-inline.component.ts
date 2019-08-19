import {Component, Input} from "@angular/core";
import {IBadge} from "../../content-db/badge-set/badge.interface";

@Component({
    selector: "app-badge-name-inline",
    templateUrl: "./badge-name-inline.component.html",
    styleUrls: ["./badge-name-inline.component.scss"]
})
export class BadgeNameInlineComponent {
    @Input() public badge: IBadge;
}
