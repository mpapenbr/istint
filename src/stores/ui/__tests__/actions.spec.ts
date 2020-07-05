import _ from "lodash";
import { changeMainLevel } from "../action";
import { uiInitialState, uiReducer } from "../reducer";
import { UiMainEnum } from "../types";
// import * as sampleCarState from "./__mockData__/sampleCarState.json";

describe("ui actions", () => {
  it("should return initial state", () => {
    expect(uiReducer(uiInitialState, { type: "nix" })).toEqual(uiInitialState);
  });
  it("should change the main level", () => {
    var sampleState = {
      ...uiInitialState,
    };
    _.merge(sampleState.data, { main: UiMainEnum.Cars });

    expect(uiReducer(uiInitialState, changeMainLevel(UiMainEnum.Cars))).toEqual(sampleState);
  });
});
