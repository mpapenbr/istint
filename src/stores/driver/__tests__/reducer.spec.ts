import { addNewDriver, removeDriver, replaceDriverState, updateDriver } from "../actions";
import { driverInitialState, driverReducer } from "../reducer";
import { defaultDriver } from "../types";
// import * as sampleRace from "./__mockData__/sampleRace.json";

describe("driver reducer", () => {
  it("should return initial state", () => {
    expect(driverReducer(driverInitialState, { type: "nix" })).toEqual(driverInitialState);
  });

  it("should replace the driver state with new data", () => {
    const sampleState = {
      ...driverInitialState,
      currentDriver: { ...defaultDriver, name: "My test driver" },
    };

    expect(driverReducer(driverInitialState, replaceDriverState(sampleState))).toMatchObject(sampleState);
  });

  it("should add a new driver on empty list", () => {
    const myInitState = { ...driverInitialState, allDrivers: [] };
    const myExpectedState = { ...driverInitialState, allDrivers: [{ ...defaultDriver, id: 1, name: "New driver" }] };

    expect(driverReducer(myInitState, addNewDriver())).toEqual(myExpectedState);
  });

  it("should add a new driver on non-empty list", () => {
    const existing = { ...defaultDriver, id: 1 };
    const myInitState = { ...driverInitialState, allDrivers: [existing] };
    const myExpectedState = {
      ...driverInitialState,
      allDrivers: [existing, { ...defaultDriver, id: 2, name: "New driver" }],
    };

    expect(driverReducer(myInitState, addNewDriver())).toEqual(myExpectedState);
  });

  it("should remove a new driver from  list", () => {
    const existing = { ...defaultDriver, id: 1 };
    const myInitState = { ...driverInitialState, allDrivers: [existing] };
    const myExpectedState = {
      ...driverInitialState,
      allDrivers: [],
    };

    expect(driverReducer(myInitState, removeDriver(1))).toEqual(myExpectedState);
  });

  it("should update an existingdriver from  list", () => {
    const existing = { ...defaultDriver, id: 1 };
    const updateData = { ...defaultDriver, id: 1, name: "UpdateName", fuelPerLap: 7.0 };
    const myInitState = { ...driverInitialState, allDrivers: [existing] };
    const myExpectedState = {
      ...driverInitialState,
      allDrivers: [updateData],
    };

    expect(driverReducer(myInitState, updateDriver(updateData))).toEqual(myExpectedState);
  });
});
