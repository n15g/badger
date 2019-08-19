import {IBadge} from "../badge.interface";
import {BadgeType} from "../../badge-type.enum";
import {ANY} from "../alignments";
import {GameMapKey} from "../../game-map/game-map-key";
import {AlternateNameType} from "../alternate-name-type.enum";

const badgeSetKey = "homecoming";
const type = BadgeType.EXPLORATION;

const IMAGE_EXPLORATION_HERO = "exploration-hero.png";
const IMAGE_EXPLORATION_VILLAIN = "exploration-villain.png";
const IMAGE_EXPLORATION_PRAETORIA = "exploration-praetoria.png";
const IMAGE_EXPLORATION_HAZARD = "exploration-hazard.png";

export const HOMECOMING_EXPLORATION_BADGES: IBadge[] = [
    {
        badgeSetKey, type, key: "lobbyist",
        canonicalName: "Lobbyist",
        alignment: ANY,
        mapKey: GameMapKey.BLOODY_BAY,
        location: [2265.0, 137.0, -832.0],
        alternateNames: [
            {type: AlternateNameType.H, value: "Lobbyist"},
            {type: AlternateNameType.V, value: "Crooked Politician"}
        ],
        badgeText: "Spanky Rabinowitz' cousin Charlie 'Big Buck' Rabinowitz owned Big Bucks Casino. It is said much of Spanky's campaign money came from the take here.",
        notes: "The Crooked Politician Badge is located in Bloody Bay on top of the casino building 120 yards due east of Meteor Do.",
        links: [
            {title: "Lobbyist Badge", href: "https://paragonwiki.com/wiki/Lobbyist_Badge"},
            {title: "Crooked Politician Badge", href: "https://paragonwiki.com/wiki/Crooked_Politician_Badge"}
        ],
        imageNames: [IMAGE_EXPLORATION_HERO, IMAGE_EXPLORATION_VILLAIN],
        vidiotMapNumber: 1
    }
];
