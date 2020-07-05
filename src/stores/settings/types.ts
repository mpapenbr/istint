import { RaceStrategyMode } from "../stint/types";

export enum StintEditMode {
  EditRow,
  MoveRows,
}
export enum TimeDisplayMode {
  Real,
  Sim,
}

export interface ISettings {
  autoRepair: boolean;
  strategy: RaceStrategyMode;
  stintEditMode: StintEditMode;
  timeDisplayMode: TimeDisplayMode;
}

export const defaultSettings = {
  autoRepair: false,
  strategy: RaceStrategyMode.ALWAYS_NEW_TIRES,
  stintEditMode: StintEditMode.EditRow,
  timeDisplayMode: TimeDisplayMode.Real,
};

export enum SettingsActionTypes {
  UPDATE_AUTO_REPAIR = "@@settings/UPDATE_AUTO_REPAIR",
  UPDATE_STRATEGY = "@@settings/UPDATE_STRATEGY",
  UPDATE_STINT_EDIT_MODE = "@@settings/UPDATE_STINT_EDIT_MODE",
  UPDATE_TIME_DISPLAY_MODE = "@@settings/UPDATE_TIME_DISPLAY_MODE",
  REPLACE = "@@settings/REPLACE",
}

export interface ISettingsState {
  readonly data: ISettings;
}
