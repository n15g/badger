import {ServerGroupSortPipe} from "./server-group-sort.pipe";
import {ServerGroupStatus} from "coh-content-db";

const GOOD_1: any = {name: "Good 1", status: [ServerGroupStatus.WORK_IN_PROGRESS]};
const GOOD_2: any = {name: "Good 2", status: [ServerGroupStatus.WORK_IN_PROGRESS]};
const WORK_IN_PROGRESS_1: any = {name: "WORK_IN_PROGRESS 1", status: [ServerGroupStatus.WORK_IN_PROGRESS]};
const WORK_IN_PROGRESS_2: any = {name: "WORK_IN_PROGRESS 2", status: [ServerGroupStatus.WORK_IN_PROGRESS]};
const SUNSET_1: any = {name: "Sunset 1", status: [ServerGroupStatus.SUNSET]};
const SUNSET_2: any = {name: "Sunset 2", status: [ServerGroupStatus.SUNSET]};
const WORK_IN_PROGRESS_SUNSET_1: any = {name: "WORK_IN_PROGRESS Sunset 1", status: [ServerGroupStatus.WORK_IN_PROGRESS, ServerGroupStatus.SUNSET]};
const WORK_IN_PROGRESS_SUNSET_2: any = {name: "WORK_IN_PROGRESS Sunset 2", status: [ServerGroupStatus.WORK_IN_PROGRESS, ServerGroupStatus.SUNSET]};

describe("BadgeSetSortPipe", () => {
    it("create an instance", () => {
        const pipe = new ServerGroupSortPipe();
        expect(pipe).toBeTruthy();
    });

    it("should sort correctly", () => {
        const input = [
            GOOD_2,
            WORK_IN_PROGRESS_1,
            SUNSET_2,
            WORK_IN_PROGRESS_SUNSET_2,
            WORK_IN_PROGRESS_SUNSET_1,
            GOOD_1,
            WORK_IN_PROGRESS_2,
            SUNSET_1
        ];

        const result = new ServerGroupSortPipe().transform(input);

        expect(result).toEqual([
            GOOD_1,
            GOOD_2,
            WORK_IN_PROGRESS_1,
            WORK_IN_PROGRESS_2,
            SUNSET_1,
            SUNSET_2,
            WORK_IN_PROGRESS_SUNSET_1,
            WORK_IN_PROGRESS_SUNSET_2,
        ]);
    });
});
