import {Pipe, PipeTransform} from "@angular/core";
import {IBadge, IServerGroup} from "coh-content-db";
import {ContentDbService} from "../content-db/content-db.service";

@Pipe({
    name: "badge"
})
export class BadgePipe implements PipeTransform {

    constructor(private contentDb: ContentDbService) {
    }

    public transform(badgeKey: string, args: { serverGroup: IServerGroup }): IPossiblyUnknownBadge {
        const serverGroup = args.serverGroup;

        try {
            return badgeKey ? this.contentDb.getBadge(serverGroup.key, badgeKey) : null;
        } catch {
            return {
                unknown: true,
                serverGroup: serverGroup,
                key: badgeKey,
                type: null,
                alignment: {h: false, v: false, p: false},
                names: []
            };
        }
    }
}

export interface IPossiblyUnknownBadge extends IBadge {
    readonly unknown?: boolean;
}
