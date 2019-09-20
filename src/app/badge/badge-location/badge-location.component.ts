import {Component, Input} from "@angular/core";
import {IServerGroup, PlaqueType} from "coh-content-db";

@Component({
    selector: "badge-location",
    templateUrl: "./badge-location.component.html",
    styleUrls: ["./badge-location.component.scss"]
})
export class BadgeLocationComponent {
    @Input() public data: LocationData;
}

interface LocationData {
    serverGroup: IServerGroup,
    mapKey?: string,
    location?: number[],
    vidiotMapsKey?: string,
    plaqueType?: PlaqueType
}
