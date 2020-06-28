import { RaceStrategyMode } from "../../stint/types";
import {
  replaceSettingsState,
  updateAutoRepair,
  updateStintEditMode,
  updateStrategy,
  updateTimeDisplayMode,
} from "../actions";
import { settingsInitialState, settingsReducer } from "../reducer";
import { defaultSettings, StintEditMode, TimeDisplayMode } from "../types";
// import * as sampleRace from "./__mockData__/sampleRace.json";

describe("settings reducer", () => {
  it("should return initial state", () => {
    expect(settingsReducer(settingsInitialState, { type: "nix" })).toEqual(settingsInitialState);
  });

  it("should replace the settings state with new data", () => {
    const sampleState = {
      ...settingsInitialState,
      data: { ...defaultSettings, autoRepair: false },
    };
    expect(settingsReducer(settingsInitialState, replaceSettingsState(sampleState))).toEqual(sampleState);
  });
  it("should set auto repair in state", () => {
    const sampleState = {
      ...settingsInitialState,
      data: { ...defaultSettings, autoRepair: false },
    };
    expect(settingsReducer(settingsInitialState, updateAutoRepair(false))).toMatchObject(sampleState);
  });
  it("should set race strategy mode", () => {
    const sampleState = {
      ...settingsInitialState,
      data: { ...defaultSettings, strategy: RaceStrategyMode.DOUBLE_STINT_TIRES },
    };
    expect(settingsReducer(settingsInitialState, updateStrategy(RaceStrategyMode.DOUBLE_STINT_TIRES))).toMatchObject(
      sampleState
    );
  });
  it("should set stint edit mode", () => {
    const sampleState = {
      ...settingsInitialState,
      data: { ...defaultSettings, stintEditMode: StintEditMode.MoveRows },
    };
    expect(settingsReducer(settingsInitialState, updateStintEditMode(StintEditMode.MoveRows))).toMatchObject(
      sampleState
    );
  });
  it("should set time display mode", () => {
    const sampleState = {
      ...settingsInitialState,
      data: { ...defaultSettings, timeDisplayMode: TimeDisplayMode.Sim },
    };
    expect(settingsReducer(settingsInitialState, updateTimeDisplayMode(TimeDisplayMode.Sim))).toMatchObject(
      sampleState
    );
  });
});
