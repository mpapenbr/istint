import { defaultCar, ICar } from "../../car/types";
import { defaultStint } from "../../stint/reducer";
import { Stint } from "../../stint/types";
import { defaultTrack, ITrack } from "../../track/types";
import {
  resetRace,
  setCar,
  setDuration,
  setName,
  setStints,
  setTrack,
} from "../actions";
import { raceInitialState, raceReducer } from "../reducer";
import * as sampleRace from "./__mockData__/sampleRace.json";

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
    expect(
      raceReducer(raceInitialState, setStints(sampleStints))
    ).toMatchObject({
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
});
