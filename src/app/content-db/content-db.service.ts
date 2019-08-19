import {Injectable} from '@angular/core';
import * as _ from "lodash";
import {IGameMap} from "./game-map/game-map.interface";
import {IBadgeSet} from "./badge-set/badge-set.interface";
import {GAME_MAPS} from "./game-map/game-map";
import {IBadge} from "./badge-set/badge.interface";
import {BADGE_SETS} from "./badge-sets";

@Injectable({
    providedIn: 'root'
})
export class ContentDbService {
    private readonly maps: { [id: string]: IGameMap };
    private readonly badgeSets: { [id: string]: IBadgeSet };
    private readonly badges: { [id: string]: IBadge };

    constructor() {
        this.maps = _.keyBy(GAME_MAPS, x => x.key);

        this.badgeSets = _.keyBy(BADGE_SETS, x => x.key);

        this.badges = _(this.badgeSets)
            .flatMap(badgeSet => badgeSet.badges)
            .keyBy(badge => `${badge.badgeSetKey}:${badge.key}`)
            .value();
    }

    public getMaps(): IGameMap[] {
        return _.values(this.maps);
    }

    public getMap(key: string): IGameMap | null {
        return this.maps[key];
    }

    public getBadgeSets(): IBadgeSet[] {
        return _.values(this.badgeSets);
    }

    public getBadgeSet(key: string): IBadgeSet | null {
        return this.badgeSets[key];
    }

    public getBadges(badgeSetKey: string): IBadge[] {
        const badgeSet = this.getBadgeSet(badgeSetKey);

        return badgeSet ? badgeSet.badges : [];
    }

    public getBadge(badgeSetKey: string, badgeKey: string): IBadge | null {
        return this.badges[`${badgeSetKey}:${badgeKey}`];
    }
}
