import {BadgeNamesPipe} from "./badge-names.pipe";

describe("BadgeNamesPipe", () => {
    it("create an instance", () => {
        const pipe = new BadgeNamesPipe();
        expect(pipe).toBeTruthy();
    });
});
