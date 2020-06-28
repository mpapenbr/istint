import { defaultCar, ICar } from "../../car/types";
import { defaultStint } from "../../stint/reducer";
import { Stint } from "../../stint/types";
import { defaultTrack, ITrack } from "../../track/types";
import {
  moveStint,
  resetRace,
  setCar,
  setDuration,
  setName,
  setStartReal,
  setStartSim,
  setStints,
  setTrack,
} from "../actions";
import { raceInitialState, raceReducer } from "../reducer";
import { defaultTimedRace } from "../types";
import * as sampleRace from "./__mockData__/sampleRace.json";

describe("race reducer", () => {
  it("should return initial state", () => {
    expect(raceReducer(raceInitialState, { type: "nix" })).toEqual(raceInitialState);
  });

  it("should set the duration ", () => {
    expect(raceReducer(raceInitialState, setDuration(42))).toMatchObject({
      data: { duration: 42 },
    });
  });

  it("should set the real start time ", () => {
    const value = new Date("2020-06-22T21:00:00Z");
    expect(raceReducer(raceInitialState, setStartReal(value))).toMatchObject({
      data: { startReal: value },
    });
  });

  it("should set the sim start time ", () => {
    const value = new Date("2020-06-22T21:00:00Z");
    expect(raceReducer(raceInitialState, setStartSim(value))).toMatchObject({
      data: { startSim: value },
    });
  });

  it("should set the name ", () => {
    expect(raceReducer(raceInitialState, setName("Test race"))).toMatchObject({
      data: { name: "Test race" },
    });
  });

  it("should set the car ", () => {
    const sampleCar: ICar = {
      ...defaultCar,
      id: 29,
      name: "Something",
      tank: 30,
    };
    expect(raceReducer(raceInitialState, setCar(sampleCar))).toMatchObject({
      data: { car: sampleCar },
    });
  });

  it("should set the track ", () => {
    const sampleTrack: ITrack = {
      ...defaultTrack,
      id: 29,
      name: "Something",
      pitDelta: 388,
    };
    expect(raceReducer(raceInitialState, setTrack(sampleTrack))).toMatchObject({
      data: { track: sampleTrack },
    });
  });

  it("should set stints ", () => {
    const sampleStints: Stint[] = [
      { ...defaultStint, no: 1 },
      { ...defaultStint, no: 2 },
    ];
    expect(raceReducer(raceInitialState, setStints(sampleStints))).toMatchObject({
      data: { stints: sampleStints },
    });
  });

  it("should reset to default ", () => {
    expect(
      raceReducer(
        {
          data: sampleRace,
        },
        resetRace()
      )
    ).toEqual(raceInitialState);
  });

  it("should move a stint and renumber ", () => {
    const sampleStints: Stint[] = [
      { ...defaultStint, no: 1, numLaps: 10 },
      { ...defaultStint, no: 2, numLaps: 20 },
      { ...defaultStint, no: 3, numLaps: 30 },
    ];
    const initState = { ...raceInitialState, data: { ...defaultTimedRace, stints: sampleStints } };
    expect(raceReducer(initState, moveStint({ oldIndex: 0, newIndex: 2 }))).toMatchObject({
      data: {
        stints: [
          { no: 1, numLaps: 20 },
          { no: 2, numLaps: 30 },
          { no: 3, numLaps: 10 },
        ],
      },
    });
  });
});
