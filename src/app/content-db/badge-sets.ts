import {IBadgeSet} from "./badge-set/badge-set.interface";
import {HomecomingBadgeSet} from "./badge-set/homecoming/homecoming.badge-set";

export const BADGE_SETS: IBadgeSet[] = [
    new HomecomingBadgeSet()
];
