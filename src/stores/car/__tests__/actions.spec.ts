import { action } from "typesafe-actions";
import { replaceCarState } from "../actions";
import { CarActionTypes } from "../types";
import * as sampleCarState from "./__mockData__/sampleCarState.json";

describe("car actions", () => {
  it("should replace the car state with new data", () => {
    const expectedAction = action(CarActionTypes.REPLACE, sampleCarState);
    expect(replaceCarState(sampleCarState)).toEqual(expectedAction);
  });
});
