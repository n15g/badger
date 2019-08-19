import {IBadge} from "./badge-set/badge.interface";
import {ANY} from "./badge-set/alignments";
import {GameMapKey} from "./game-map/game-map-key";
import {AlternateNameType} from "./badge-set/alternate-name-type.enum";
import {BadgeType} from "./badge-type.enum";

export const TEST_EXPLORATION_BADGE: IBadge = {
    badgeSetKey: "test-badges",
    type: BadgeType.EXPLORATION,
    key: "test-exploration",
    canonicalName: "Test Exploration",
    alignment: ANY,
    mapKey: GameMapKey.BLOODY_BAY,
    location: [2265.0, 137.0, -832.0],
    alternateNames: [
        {type: AlternateNameType.H, value: "Test Exploration"},
        {type: AlternateNameType.V, value: "Villain Test Exploration"}
    ],
    badgeText: "Some text",
    notes: "Some notes",
    links: [
        {title: "Test Exploration", href: "https://example.com/Test_Exploration"},
        {title: "Villain Test Exploration", href: "https://example.com/Villain_Test_Exploration"}
    ],
    imageNames: ["exploration-hero.png", "exploration-villain.png"],
    vidiotMapNumber: 1
};
