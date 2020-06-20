import { action } from "typesafe-actions";
import { replaceDriverState } from "../actions";
import { driverInitialState } from "../reducer";
import { defaultDriver, DriverActionTypes } from "../types";
// import * as sampleCarState from "./__mockData__/sampleCarState.json";

describe("driver actions", () => {
  it("should replace the driver state with new data", () => {
    const sampleDriverState = {
      ...driverInitialState,
      currentDriver: { ...defaultDriver, name: "My action driver" },
    };
    const expectedAction = action(DriverActionTypes.REPLACE, sampleDriverState);
    expect(replaceDriverState(sampleDriverState)).toEqual(expectedAction);
  });
});
