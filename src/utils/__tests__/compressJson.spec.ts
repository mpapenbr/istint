import { compressJson, decompress } from "../compressJson";

describe("compressing json", () => {
  test("xroundtrip", () => {
    const sample = { data: { x: "y", d: new Date() } };
    const result = compressJson(sample).then((s) => decompress(s));
    expect(result).resolves.toEqual(sample);
  });
});
