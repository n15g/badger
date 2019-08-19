import {Component, Input} from "@angular/core";
import {IBadge} from "../../content-db/badge-set/badge.interface";

@Component({
    selector: "app-badge-images",
    templateUrl: "./badge-images.component.html",
    styleUrls: ["./badge-images.component.scss"]
})
export class BadgeImagesComponent {
    @Input() public badge: IBadge;
}
