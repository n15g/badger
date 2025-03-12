import {Injectable} from '@angular/core';
import {CohContentDb, IBadge, IGameMap, IServerGroup} from "coh-content-db";
import {Homecoming, HomecomingBadges, HomecomingChangelog} from "coh-content-db-homecoming";

@Injectable({
    providedIn: 'root'
})
export class ContentDbService {
    private contentDb: CohContentDb;

    constructor() {
        this.contentDb = new CohContentDb();
        this.contentDb.load(new Homecoming());
        this.contentDb.load(new HomecomingBadges());
        this.contentDb.load(new HomecomingChangelog());
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
        return this.getServerGroup(serverGroupKey).getMap(mapKey);
    }

    public getBadge(serverGroupKey: string, badgeKey: string): IBadge | null {
        return this.getServerGroup(serverGroupKey).getBadge(badgeKey);
    }
}
