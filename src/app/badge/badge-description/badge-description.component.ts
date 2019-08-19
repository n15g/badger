import {Component, Input} from "@angular/core";
import {IBadge} from "../../content-db/badge-set/badge.interface";

@Component({
    selector: "app-badge-description",
    templateUrl: "./badge-description.component.html",
    styleUrls: ["./badge-description.component.scss"]
})
export class BadgeDescriptionComponent {
    @Input() public badge: IBadge;
}
