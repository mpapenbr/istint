import { action } from "typesafe-actions";
import { IBaseAction } from "../../commons";
import { CarActionTypes, CarState, ICar } from "./types";

export const updateDefaultCar = (data: ICar): IBaseAction =>
  action(CarActionTypes.UPDATE_DEFAULT_CAR, data);
export const replaceCarState = (newData: CarState) =>
  action(CarActionTypes.REPLACE, newData);
