import {Component, Input} from "@angular/core";
import {IBadge} from "coh-content-db";

@Component({
    selector: "app-badge-location",
    templateUrl: "./badge-location.component.html",
    styleUrls: ["./badge-location.component.scss"]
})
export class BadgeLocationComponent {
    @Input() public badge: IBadge;
}
