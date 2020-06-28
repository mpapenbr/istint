import { action } from "typesafe-actions";
import { IBaseAction } from "../../commons";
import { RaceStrategyMode } from "../stint/types";
import { ISettingsState, SettingsActionTypes, StintEditMode } from "./types";

export const updateAutoRepair = (data: boolean): IBaseAction => action(SettingsActionTypes.UPDATE_AUTO_REPAIR, data);
export const updateStrategy = (data: RaceStrategyMode): IBaseAction =>
  action(SettingsActionTypes.UPDATE_STRATEGY, data);
export const updateStintEditMode = (data: StintEditMode): IBaseAction =>
  action(SettingsActionTypes.UPDATE_STINT_EDIT_MODE, data);
export const replaceSettingsState = (data: ISettingsState): IBaseAction => action(SettingsActionTypes.REPLACE, data);
