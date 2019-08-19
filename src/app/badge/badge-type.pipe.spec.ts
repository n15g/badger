import {BadgeTypePipe} from "./badge-type.pipe";
import {BadgeType} from "../content-db/badge-type.enum";

const pipe = new BadgeTypePipe();

describe("BadgeTypePipe", () => {
    it("create an instance", () => {
        expect(pipe).toBeTruthy();
    });

    it("should format [EXPLORATION] to [Exploration]", () => {
        expect(pipe.transform(BadgeType.EXPLORATION)).toEqual("Exploration");
    });

    it("should format [DAY_JOB] to [Day Job]", () => {
        expect(pipe.transform(BadgeType.DAY_JOB)).toEqual("Day Job");
    });
});
