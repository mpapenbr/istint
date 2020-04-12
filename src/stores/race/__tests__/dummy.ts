import { equal } from "assert";

describe("what does this?", () => {

    test("1==1 should be true ", () => {
        const a = 1
        expect(a).toEqual(1)
    });

    it("should detect other stuff", () => {
        const a = 1
        expect(a).not.toEqual(2)
    });


});