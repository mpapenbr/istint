import { replaceDriverState } from "../actions";
import { driverInitialState, driverReducer } from "../reducer";
import { defaultDriver } from "../types";
// import * as sampleRace from "./__mockData__/sampleRace.json";

describe("driver reducer", () => {
  it("should return initial state", () => {
    expect(driverReducer(driverInitialState, { type: "nix" })).toEqual(
      driverInitialState
    );
  });

  it("should replace the driver state with new data", () => {
    const sampleState = {
      ...driverInitialState,
      currentDriver: { ...defaultDriver, name: "My test driver" },
    };

    expect(
      driverReducer(driverInitialState, replaceDriverState(sampleState))
    ).toMatchObject(sampleState);
  });
});
