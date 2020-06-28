import { action } from "typesafe-actions";
import { RaceStrategyMode } from "../../stint/types";
import { updateAutoRepair, updateStintEditMode, updateStrategy } from "../actions";
import { SettingsActionTypes, StintEditMode } from "../types";
// import * as sampleCarState from "./__mockData__/sampleCarState.json";

describe("track actions", () => {
  it("should create action with auto repair ", () => {
    const expectedAction = action(SettingsActionTypes.UPDATE_AUTO_REPAIR, false);
    expect(updateAutoRepair(false)).toEqual(expectedAction);
  });
  it("should create action with race strategy ", () => {
    const expectedAction = action(SettingsActionTypes.UPDATE_STRATEGY, RaceStrategyMode.DOUBLE_STINT_TIRES);
    expect(updateStrategy(RaceStrategyMode.DOUBLE_STINT_TIRES)).toEqual(expectedAction);
  });
  it("should create action with stint edit mode ", () => {
    const expectedAction = action(SettingsActionTypes.UPDATE_STINT_EDIT_MODE, StintEditMode.MoveRows);
    expect(updateStintEditMode(StintEditMode.MoveRows)).toEqual(expectedAction);
  });
});
