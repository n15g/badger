import {Component, Input} from "@angular/core";
import {IBadge} from "coh-content-db";
import {faQuestionCircle} from "@fortawesome/free-solid-svg-icons/faQuestionCircle";

@Component({
    selector: "badge-list-icons",
    templateUrl: "./badge-list-icons.component.html",
    styleUrls: ["./badge-list-icons.component.scss"]
})
export class BadgeListIconsComponent {
    @Input() public badges: IBadge[];
    @Input() public villain: boolean = false;

    missingImageIcon = faQuestionCircle;

    constructor() {
    }
}
