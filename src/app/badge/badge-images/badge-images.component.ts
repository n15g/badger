import {Component, Input, OnChanges, SimpleChanges} from "@angular/core";
import {IBadge} from "coh-content-db";
import {DomSanitizer} from "@angular/platform-browser";
import * as _ from 'lodash';

@Component({
    selector: "badge-images",
    templateUrl: "./badge-images.component.html",
    styleUrls: ["./badge-images.component.scss"]
})
export class BadgeImagesComponent implements OnChanges {
    @Input() public badge: IBadge;
    public images;


    constructor(private domSanitizer: DomSanitizer) {
    }

    public ngOnChanges(changes: SimpleChanges): void {
        this.images = _.map(this.badge.images, (image) => this.domSanitizer.bypassSecurityTrustResourceUrl(image));
    }
}
