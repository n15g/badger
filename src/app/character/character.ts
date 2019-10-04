import * as shortId from "shortid";

export interface ICharacter {
    readonly key: string;
    name: string;
    serverGroupKey: string;
    server: string;
    archetypeKey?: string;
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
