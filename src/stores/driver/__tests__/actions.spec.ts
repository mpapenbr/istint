import { action } from "typesafe-actions";
import { addNewDriver, replaceDriverState } from "../actions";
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
  it("should add a new entry to the driver list", () => {
    const expectedAction = action(DriverActionTypes.ADD_NEW_DRIVER, {});
    expect(addNewDriver()).toEqual(expectedAction);
  });
});
