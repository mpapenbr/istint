import { action } from "typesafe-actions";
import { replaceCarState } from "../actions";
import { carInitialState } from "../reducer";
import { CarActionTypes, defaultCar } from "../types";
// import * as sampleCarState from "./__mockData__/sampleCarState.json";

describe("car actions", () => {
  it("should replace the car state with new data", () => {
    const sampleCarState = {
      ...carInitialState,
      currentCar: { ...defaultCar, name: "TestCar" },
    };
    const expectedAction = action(CarActionTypes.REPLACE, sampleCarState);
    expect(replaceCarState(sampleCarState)).toEqual(expectedAction);
  });
});
