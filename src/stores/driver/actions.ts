import { action } from "typesafe-actions";
import { IBaseAction } from "../../commons";
import { DriverActionTypes, DriverState, IDriver } from "./types";

export const updateDefaultDriver = (data: IDriver): IBaseAction =>
  action(DriverActionTypes.UPDATE_DEFAULT_DRIVER, data);
export const replaceDriverState = (data: DriverState): IBaseAction =>
  action(DriverActionTypes.REPLACE, data);
