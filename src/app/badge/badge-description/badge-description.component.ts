import {Component, Input} from "@angular/core";
import {BadgePartialType, IBadge} from "coh-content-db";
import * as _ from 'lodash';

@Component({
    selector: "badge-description",
    templateUrl: "./badge-description.component.html",
    styleUrls: ["./badge-description.component.scss"]
})
export class BadgeDescriptionComponent {
    @Input() public badge: IBadge;

    public hasPlusOneInvention(): boolean {
        return _.some(this.badge.partials, (partial) => partial.type === BadgePartialType.INVENTION_PLUS_ONE);
    }
}
