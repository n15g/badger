import {Component, Input} from "@angular/core";
import {IBadge} from "coh-content-db";

@Component({
    selector: "badge-icons",
    templateUrl: "./badge-icons.component.html",
    styleUrls: ["./badge-icons.component.scss"]
})
export class BadgeIconsComponent {
    @Input() public badge: IBadge;
}
