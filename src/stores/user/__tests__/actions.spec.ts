import { uiInitialState, userReducer } from "../reducer";

// import * as sampleCarState from "./__mockData__/sampleCarState.json";

describe("ui actions", () => {
  it("should return initial state", () => {
    expect(userReducer(uiInitialState, { type: "nix" })).toEqual(uiInitialState);
  });
});
