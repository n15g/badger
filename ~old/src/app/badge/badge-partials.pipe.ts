import {Pipe, PipeTransform} from "@angular/core";
import {IBadge, IBadgePartial, IServerGroup} from "coh-content-db";
import * as _ from 'lodash';
import {BadgePipe} from "./badge.pipe";

@Pipe({
    name: "badgePartials"
})
export class BadgePartialsPipe implements PipeTransform {

    constructor(private badgePipe: BadgePipe) {

    }

    public transform(partials: IBadgePartial[], serverGroup: IServerGroup): IBadge[] {
        return _(partials)
            .filter((partial) => partial.badgeKey != undefined)
            .map(partial => this.badgePipe.transform(partial.badgeKey, serverGroup))
            .value();
    }
}
