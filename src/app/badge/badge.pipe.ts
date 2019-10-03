import {Pipe, PipeTransform} from "@angular/core";
import {IBadge, IServerGroup} from "coh-content-db";
import {ContentDbService} from "../content-db/content-db.service";

@Pipe({
    name: "badge"
})
export class BadgePipe implements PipeTransform {

    constructor(private contentDb: ContentDbService) {
    }

    public transform(badgeKey: string, args: { serverGroup: IServerGroup }): IBadge | null {
        const serverGroup = args.serverGroup;

        try {
            return this.contentDb.getBadge(serverGroup.key, badgeKey);
        } catch {
            return null;
        }
    }
}

