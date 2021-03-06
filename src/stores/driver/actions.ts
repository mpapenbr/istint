import { action } from "typesafe-actions";
import { IBaseAction } from "../../commons";
import { DriverActionTypes, DriverState, IDriver } from "./types";

export const updateDefaultDriver = (data: IDriver): IBaseAction =>
  action(DriverActionTypes.UPDATE_DEFAULT_DRIVER, data);
export const addNewDriver = (): IBaseAction => action(DriverActionTypes.ADD_NEW_DRIVER, {});
export const removeDriver = (id: number): IBaseAction => action(DriverActionTypes.REMOVE_DRIVER, id);
export const duplicateDriver = (id: number): IBaseAction => action(DriverActionTypes.DUPLICATE_DRIVER, id);
export const updateDriver = (data: IDriver): IBaseAction => action(DriverActionTypes.UPDATE_DRIVER, data);
export const replaceDriverState = (data: DriverState): IBaseAction => action(DriverActionTypes.REPLACE, data);
