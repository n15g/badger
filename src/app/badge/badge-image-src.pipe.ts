import {Pipe, PipeTransform} from "@angular/core";
import {Alternate, IBadge} from "coh-content-db";
import {oc} from "ts-optchain";
import * as _ from "lodash";

@Pipe({
    name: "badgeIconSrc"
})
export class BadgeIconSrcPipe implements PipeTransform {

    constructor() {
    }

    public transform(badge: IBadge, villain: boolean = false): string | null {
        const icons = oc(badge).icons([]);

        if (icons.length < 1) return null;

        if (icons.length === 1) return icons[0].value;

        const specific = _.find(icons, (imageKey) => imageKey.type === (villain ? Alternate.V : Alternate.H));
        if (specific != null) return specific.value;

        const generic = _.find(icons, (imageKey) => imageKey.type === null);
        if (generic != null) return generic.value;

        return null;
    }
}
