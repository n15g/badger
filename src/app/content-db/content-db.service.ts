import {Injectable} from '@angular/core';
import {CohContentDb, IBadge, IGameMap, IServerGroup} from "coh-content-db";
import {Homecoming, HomecomingBadges} from "coh-content-db-homecoming";

@Injectable({
    providedIn: 'root'
})
export class ContentDbService {
    private contentDb: CohContentDb;

    constructor() {
        this.contentDb = new CohContentDb();
        this.contentDb.load(new Homecoming());
        this.contentDb.load(new HomecomingBadges());
    }

    public getServerGroups(): IServerGroup[] {
        return this.contentDb.getServerGroups();
    }

    public getServerGroup(serverGroupKey: string): IServerGroup {
        const serverGroup = this.contentDb.getServerGroup(serverGroupKey);
        if (serverGroup == null) throw new Error(`Unknown server group key [${serverGroupKey}]`);
        return serverGroup;
    }

    public getGameMap(serverGroupKey: string, mapKey: string): IGameMap | null {
        const map = this.getServerGroup(serverGroupKey).getMap(mapKey);
        if (map == null) throw new Error(`Unknown map key [${serverGroupKey}:${mapKey}]`);
        return map;
    }

    public getBadge(serverGroupKey: string, badgeKey: string): IBadge | null {
        const badge = this.getServerGroup(serverGroupKey).getBadge(badgeKey);
        if (badge == null) throw new Error(`Unknown map key [${serverGroupKey}:${badgeKey}]`);
        return badge;
    }
}
