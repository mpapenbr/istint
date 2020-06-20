import { replaceCarState } from "../actions";
import { carInitialState, carReducer } from "../reducer";
import { defaultCar } from "../types";
// import * as sampleRace from "./__mockData__/sampleRace.json";

describe("car reducer", () => {
  it("should return initial state", () => {
    expect(carReducer(carInitialState, { type: "nix" })).toEqual(
      carInitialState
    );
  });

  it("should replace the car state with new data", () => {
    const sampleState = {
      ...carInitialState,
      currentCar: { ...defaultCar, name: "TestCar" },
    };

    expect(
      carReducer(carInitialState, replaceCarState(sampleState))
    ).toMatchObject(sampleState);
  });
});
