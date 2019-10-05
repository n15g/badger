import {Pipe, PipeTransform} from "@angular/core";
import {Alternate, IBadge} from "coh-content-db";
import {oc} from "ts-optchain";
import * as _ from "lodash";

@Pipe({
    name: "badgeImageSrc"
})
export class BadgeImageSrcPipe implements PipeTransform {

    constructor() {
    }

    public transform(badge: IBadge, villain: boolean = false): string | null {
        const imageKeys = oc(badge).imageKeys([]);

        if (imageKeys.length < 1) return null;

        if (imageKeys.length === 1) return this.path(imageKeys[0].value);

        const specific = _.find(imageKeys, (imageKey) => imageKey.type === (villain ? Alternate.V : Alternate.H));
        if (specific != null) return this.path(specific.value);

        const generic = _.find(imageKeys, (imageKey) => imageKey.type === null);
        if (generic != null) return this.path(generic.value);

        return null;
    }

    private path(imageKey: string): string {
        const path = _.replace(imageKey, /\./g, "/");

        return `./assets/badge/${path}.png`;
    }
}
