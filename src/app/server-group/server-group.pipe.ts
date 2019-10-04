import {Pipe, PipeTransform} from "@angular/core";
import {IServerGroup} from "coh-content-db";
import {ContentDbService} from "../content-db/content-db.service";

@Pipe({
    name: "serverGroup"
})
export class ServerGroupPipe implements PipeTransform {

    constructor(private contentDb: ContentDbService) {
    }

    public transform(serverGroupKey: string): IServerGroup | null {
        try {
            return this.contentDb.getServerGroup(serverGroupKey);
        } catch {
            return null;
        }
    }
}

