import { compressJson, decompress } from "../compressJson";

describe("compressing json", () => {
  test("roundtrip", () => {
    const sample = { data: { x: "y" } };
    const result = compressJson(sample).then((s) => decompress(s));
    expect(result).resolves.toEqual(sample);
  });
});
