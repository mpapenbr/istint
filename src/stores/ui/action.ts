import { action } from "typesafe-actions";
import { IBaseAction } from "../../commons";
import { UiActionTypes, UiMainEnum } from "./types";

export const changeMainLevel = (data: UiMainEnum): IBaseAction => action(UiActionTypes.CHANGE_MAIN_LEVEL, data);
