import {GameMapKey} from "./game-map-key";
import {IGameMap} from "./game-map.interface";

export const GAME_MAPS: IGameMap[] = [
    {
        key: GameMapKey.ARCHITECT_ENTERTAINMENT_BUILDINGS,
        name: "Architect Entertainment Buildings",
        links: [{title: "Architect Entertainment Buildings", href: "https://paragonwiki.com/wiki/Architect_Entertainment_Buildings"}]
    },
    {
        key: GameMapKey.ATLAS_PARK,
        name: "Atlas Park",
        links: [{title: "Atlas Park", href: "https://paragonwiki.com/wiki/Atlas_Park"}]
    },
    {
        key: GameMapKey.BLOODY_BAY,
        name: "Bloody Bay",
        links: [{title: "Bloody Bay", href: "https://paragonwiki.com/wiki/Bloody_Bay"}]
    },
    {
        key: GameMapKey.CAP_AU_DIABLE,
        name: "Cap Au Diable",
        links: [{title: "Cap Au Diable", href: "https://paragonwiki.com/wiki/Cap_au_Diable"}]
    },
    {
        key: GameMapKey.MERCY_ISLAND,
        name: "Mercy Island",
        links: [{title: "Mercy Island", href: "https://paragonwiki.com/wiki/Mercy_Island"}]
    },
    {
        key: GameMapKey.RECLUSES_VICTORY,
        name: "Recluse's Victory",
        links: [{title: "Recluse's Victory", href: "https://paragonwiki.com/wiki/Recluse%27s_Victory"}]
    }
];
