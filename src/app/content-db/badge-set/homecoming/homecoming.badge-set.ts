import {BadgeSetStatus} from "../badge-set-status.enum";
import {IBadgeSet} from "../badge-set.interface";
import {HOMECOMING_EXPLORATION_BADGES} from "./homecoming.exploration";

export class HomecomingBadgeSet implements IBadgeSet {
    public readonly key = "homecoming";
    public readonly name = "Homecoming";
    public readonly description = "Badge set from the [Homecoming](https://forums.homecomingservers.com/) servers.";
    public readonly status = [BadgeSetStatus.INCOMPLETE];
    public readonly badges = [
        ...HOMECOMING_EXPLORATION_BADGES
    ];
}
