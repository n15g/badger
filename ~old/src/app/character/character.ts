import * as shortId from "shortid";

export interface ICharacter {
    readonly key: string;
    name: string;
    serverGroupKey: string;
    server: string;
    archetypeKey?: string;
    badges?: CollectedBadgesList
}

export function newCharacter(name: string, serverGroupKey: string, server: string, archetypeKey?: string): ICharacter {
    return {
        key: shortId.generate(),
        name,
        serverGroupKey,
        server,
        archetypeKey
    };
}

export type CollectedBadgesList = {
    [id: string]: CollectedBadgesEntry
}

export type CollectedPartialsList = {
    [id: string]: CollectedPartialsEntry
};

export type CollectedBadgesEntry = {
    owned: boolean;
    partials?: CollectedPartialsList
};

export type CollectedPartialsEntry = {
    owned: boolean;
    craftCount?: number;
};
