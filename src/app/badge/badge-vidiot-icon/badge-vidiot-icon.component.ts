import {Component, Input} from '@angular/core';
import {PlaqueType} from "coh-content-db";

@Component({
    selector: 'badge-vidiot-icon',
    templateUrl: './badge-vidiot-icon.component.html',
    styleUrls: ['./badge-vidiot-icon.component.scss']
})
export class BadgeVidiotIconComponent {
    @Input() public data: VidiotMapData;

    public getIcon() {
        if (this.data.plaqueType === undefined) {
            return "badge";
        } else {
            return this.data.plaqueType == PlaqueType.WALL_PLAQUE ? "wall-plaque" : "monument";
        }
    }

    public getTitle() {
        if (this.data.plaqueType === undefined) {
            return "Vidiot Map Badge";
        } else {
            return this.data.plaqueType == PlaqueType.WALL_PLAQUE ? "Vidiot Map Wall Plaque" : "Vidiot Map Monument";
        }
    }
}

interface VidiotMapData {
    vidiotMapKey?: string,
    plaqueType?: PlaqueType
}
