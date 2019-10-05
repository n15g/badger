import {Pipe, PipeTransform} from "@angular/core";
import * as _ from "lodash";
import {CollectedBadgesEntry, CollectedBadgesList, ICharacter} from "./character";
import {IBadge, IBadgePartial} from "coh-content-db";
import {oc} from "ts-optchain";

@Pipe({
    name: "characterBadges"
})
export class CharacterBadgesPipe implements PipeTransform {

    transform(value: IBadge[], character: ICharacter): ICharacterBadge[] {
        const collectionData: CollectedBadgesList = oc(character).badges({});

        return _(value)
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
            return {
                ...partial,
                owned: oc(partialsData[partial.key]).owned(false)
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
}
