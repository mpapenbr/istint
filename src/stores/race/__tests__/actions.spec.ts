import { action } from "typesafe-actions";
import {
  resetRace,
  sagaChangeDuration,
  sagaChangeRaceRealStartTime,
  sagaChangeRaceSimStartTime,
  setDuration,
  setStartReal,
  setStartSim,
} from "../actions";
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

  it("should create a saga duration action", () => {
    const expectedAction = action(RaceActionTypes.SAGA_CHANGE_DURATION, 42);
    expect(sagaChangeDuration(42)).toEqual(expectedAction);
  });

  it("should create a saga change real race time action", () => {
    const expectedAction = action(RaceActionTypes.SAGA_CHANGE_RACE_REAL_TIME, new Date("2020-06-22T21:00:00Z"));
    expect(sagaChangeRaceRealStartTime(new Date("2020-06-22T21:00:00Z"))).toEqual(expectedAction);
  });
  it("should create a saga change sim race time action", () => {
    const expectedAction = action(RaceActionTypes.SAGA_CHANGE_RACE_SIM_TIME, new Date("2020-06-22T21:15:00Z"));
    expect(sagaChangeRaceSimStartTime(new Date("2020-06-22T21:15:00Z"))).toEqual(expectedAction);
  });

  it("should create a change real race time action", () => {
    const expectedAction = action(RaceActionTypes.SET_START_REAL, new Date("2020-06-22T21:00:00Z"));
    expect(setStartReal(new Date("2020-06-22T21:00:00Z"))).toEqual(expectedAction);
  });
  it("should create a change sim race time action", () => {
    const expectedAction = action(RaceActionTypes.SET_START_SIM, new Date("2020-06-22T21:15:00Z"));
    expect(setStartSim(new Date("2020-06-22T21:15:00Z"))).toEqual(expectedAction);
  });
});
