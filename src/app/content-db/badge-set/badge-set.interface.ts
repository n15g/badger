import {IBadge} from "./badge.interface";
import {BadgeSetStatus} from "./badge-set-status.enum";

export interface IBadgeSet {
    readonly key: string;
    readonly name: string;
    readonly description: string;
    readonly status: BadgeSetStatus[];
    readonly badges: IBadge[];
}
