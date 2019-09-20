import {Component, Input} from "@angular/core";
import {IBadge} from "coh-content-db";

@Component({
    selector: "badge-description",
    templateUrl: "./badge-description.component.html",
    styleUrls: ["./badge-description.component.scss"]
})
export class BadgeDescriptionComponent {
    @Input() public badge: IBadge;
}
