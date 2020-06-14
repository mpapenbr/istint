import { secAsString } from "../output";

describe("output tests", () => {
  test("seconds", () => {
    expect(secAsString(10)).toEqual("0:10");
  });
  test("minutes", () => {
    expect(secAsString(70)).toEqual("1:10");
  });
});
