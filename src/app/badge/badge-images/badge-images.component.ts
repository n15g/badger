import {Component, Input} from "@angular/core";
import {IBadge} from "coh-content-db";
import * as _ from 'lodash';

@Component({
    selector: "badge-images",
    templateUrl: "./badge-images.component.html",
    styleUrls: ["./badge-images.component.scss"]
})
export class BadgeImagesComponent {
    @Input() public badge: IBadge;

    public getSrc(imageKey: string) {
        const path = _.replace(imageKey, /\./g, "/");

        return `/assets/badge/${path}.png`;
    }
}
