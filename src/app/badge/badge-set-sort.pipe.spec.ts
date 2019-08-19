import {BadgeSetSortPipe} from "./badge-set-sort.pipe";
import {IBadgeSet} from "../content-db/badge-set/badge-set.interface";
import {BadgeSetStatus} from "../content-db/badge-set/badge-set-status.enum";

const GOOD_1: IBadgeSet = {key: "good1", name: "Good 1", status: [BadgeSetStatus.INCOMPLETE], description: "", badges: []};
const GOOD_2: IBadgeSet = {key: "good2", name: "Good 2", status: [BadgeSetStatus.INCOMPLETE], description: "", badges: []};
const INCOMPLETE_1: IBadgeSet = {key: "incomplete1", name: "Incomplete 1", status: [BadgeSetStatus.INCOMPLETE], description: "", badges: []};
const INCOMPLETE_2: IBadgeSet = {key: "incomplete2", name: "Incomplete 2", status: [BadgeSetStatus.INCOMPLETE], description: "", badges: []};
const SUNSET_1: IBadgeSet = {key: "sunset1", name: "Sunset 1", status: [BadgeSetStatus.SUNSET], description: "", badges: []};
const SUNSET_2: IBadgeSet = {key: "sunset2", name: "Sunset 2", status: [BadgeSetStatus.SUNSET], description: "", badges: []};
const INCOMPLETE_SUNSET_1: IBadgeSet = {key: "incomplete-sunset1", name: "Incomplete Sunset 1", status: [BadgeSetStatus.INCOMPLETE, BadgeSetStatus.SUNSET], description: "", badges: []};
const INCOMPLETE_SUNSET_2: IBadgeSet = {key: "incomplete-sunset2", name: "Incomplete Sunset 2", status: [BadgeSetStatus.INCOMPLETE, BadgeSetStatus.SUNSET], description: "", badges: []};

describe("BadgeSetSortPipe", () => {
    it("create an instance", () => {
        const pipe = new BadgeSetSortPipe();
        expect(pipe).toBeTruthy();
    });

    it("should sort correctly", () => {
        const input = [
            GOOD_2,
            INCOMPLETE_1,
            SUNSET_2,
            INCOMPLETE_SUNSET_2,
            INCOMPLETE_SUNSET_1,
            GOOD_1,
            INCOMPLETE_2,
            SUNSET_1
        ];

        const result = new BadgeSetSortPipe().transform(input);

        expect(result).toEqual([
            GOOD_1,
            GOOD_2,
            INCOMPLETE_1,
            INCOMPLETE_2,
            SUNSET_1,
            SUNSET_2,
            INCOMPLETE_SUNSET_1,
            INCOMPLETE_SUNSET_2,
        ]);
    });
});
