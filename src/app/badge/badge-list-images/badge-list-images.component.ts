import {Component, Input} from "@angular/core";
import {IBadge} from "coh-content-db";
import {faQuestionCircle} from "@fortawesome/free-solid-svg-icons/faQuestionCircle";

@Component({
    selector: "badge-list-images",
    templateUrl: "./badge-list-images.component.html",
    styleUrls: ["./badge-list-images.component.scss"]
})
export class BadgeListImagesComponent {
    @Input() public badges: IBadge[];
    @Input() public villain: boolean = false;

    missingImageIcon = faQuestionCircle;

    constructor() {
    }
}
