import { action } from "typesafe-actions";
import { resetRace, setDuration } from "../actions";
import { RaceActionTypes } from "../types";

describe("what does this?", () => {
  it("should create a reset race action", () => {
    const expectedAction = action(RaceActionTypes.RESET, {});
    expect(resetRace()).toEqual(expectedAction);
  });

  it("should create a set duration action", () => {
    const expectedAction = action(RaceActionTypes.SET_DURATION, 42);
    expect(setDuration(42)).toEqual(expectedAction);
  });
});
