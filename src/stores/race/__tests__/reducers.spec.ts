import { raceReducer, raceInitialState } from "../reducer";
import { setDuration, setName } from "../actions";

describe("race reducer", () => {
  it("should return initial state", () => {
    expect(raceReducer(raceInitialState, { type: "nix" })).toEqual(
      raceInitialState
    );
  });

  it("should set the duration ", () => {
    expect(raceReducer(raceInitialState, setDuration(42))).toMatchObject({
      data: { duration: 42 },
    });
  });

  it("should set the name ", () => {
    expect(raceReducer(raceInitialState, setName("Test race"))).toMatchObject({
      data: { name: "Test race" },
    });
  });
});
