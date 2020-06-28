import { RaceStrategyMode } from "../stint/types";

export enum StintEditMode {
  EditRow,
  MoveRows,
}
export interface ISettings {
  autoRepair: boolean;
  strategy: RaceStrategyMode;
  stintEditMode: StintEditMode;
}

export const defaultSettings = {
  autoRepair: true,
  strategy: RaceStrategyMode.ALWAYS_NEW_TIRES,
  stintEditMode: StintEditMode.EditRow,
};

export enum SettingsActionTypes {
  UPDATE_AUTO_REPAIR = "@@settings/UPDATE_AUTO_REPAIR",
  UPDATE_STRATEGY = "@@settings/UPDATE_STRATEGY",
  UPDATE_STINT_EDIT_MODE = "@@settings/UPDATE_STINT_EDIT_MODE",
  REPLACE = "@@settings/REPLACE",
}

export interface ISettingsState {
  readonly data: ISettings;
}
