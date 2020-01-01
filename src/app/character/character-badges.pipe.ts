import {Pipe, PipeTransform} from "@angular/core";
import * as _ from "lodash";
import {CollectedBadgesEntry, CollectedBadgesList, ICharacter} from "./character";
import {IBadge, IBadgePartial} from "coh-content-db";
import {oc} from "ts-optchain";
import {ContentDbService} from "../content-db/content-db.service";

@Pipe({
    name: "characterBadges"
})
export class CharacterBadgesPipe implements PipeTransform {
    constructor(private contentDb: ContentDbService) {
    }

    public transform(character: ICharacter): ICharacterBadge[] {
        if (character == undefined) return [];

        const collectionData: CollectedBadgesList = oc(character).badges({});

        return _(this.contentDb.getServerGroup(character.serverGroupKey).badges)
            .map((badge) => {
                const badgeData: CollectedBadgesEntry = collectionData[badge.key];
                return {
                    ...badge,
                    owned: oc(badgeData).owned(false),
                    partials: this.getPartials(badge, badgeData)
                };
            })
            .value();
    }

    private getPartials(badge: IBadge, badgeData: CollectedBadgesEntry): ICharacterBadgePartial[] {
        if (badge.partials === undefined) return undefined;
        const partialsData = oc(badgeData).partials({});

        return _.map(badge.partials, (partial) => {
            let collectedPartial = partialsData[partial.key];
            return {
                ...partial,
                owned: oc(collectedPartial).owned(false),
                craftCount: oc(collectedPartial).craftCount(0)
            };
        });
    }
}

export interface ICharacterBadge extends IBadge {
    owned: boolean;
    partials?: ICharacterBadgePartial[]
}

export interface ICharacterBadgePartial extends IBadgePartial {
    owned: boolean;
    craftCount?: number;
}
