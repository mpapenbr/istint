import { action } from "typesafe-actions";
import { IBaseAction } from "../../commons";
import { ICar } from "../car/types";
import { Stint } from "../stint/types";
import { ITrack } from "../track/types";
import {
  IChangeSingleStintParam,
  IModifyStintParam,
  ISimpleRaceProposalParam,
  RaceActionTypes,
} from "./types";

export const sagaTest = (duration: number): IBaseAction =>
  action(RaceActionTypes.SAGA_TEST, duration);
export const sagaTestDouble = (duration: number): IBaseAction =>
  action(RaceActionTypes.SAGA_TEST_DOUBLE, duration);

export const sagaChangeSingleStint = (param: IModifyStintParam) =>
  action(RaceActionTypes.SAGA_CHANGE_SINGLE_STINT, param);
export const sagaChangeSingleStintAttributeNumLaps = (
  param: IChangeSingleStintParam
) => action(RaceActionTypes.SAGA_CHANGE_STINT_ATTRIBUTE_NUMLAPS, param);
export const sagaChangeSingleStintAttributeFuelPerLap = (
  param: IChangeSingleStintParam
) => action(RaceActionTypes.SAGA_CHANGE_STINT_ATTRIBUTE_FUELPERLAP, param);
export const sagaChangeSingleStintAttributeLaptime = (
  param: IChangeSingleStintParam
) => action(RaceActionTypes.SAGA_CHANGE_STINT_ATTRIBUTE_LAPTIME, param);
export const sagaChangeSingleStintAttributeTires = (
  param: IChangeSingleStintParam
) => action(RaceActionTypes.SAGA_CHANGE_STINT_ATTRIBUTE_TIRES, param);
export const sagaChangeCar = (carId: number) =>
  action(RaceActionTypes.SAGA_CHANGE_CAR, carId);
export const sagaChangeTrack = (trackId: number) =>
  action(RaceActionTypes.SAGA_CHANGE_TRACK, trackId);

export const setDuration = (duration: number): IBaseAction =>
  action(RaceActionTypes.SET_DURATION, duration);
export const setName = (name: string): IBaseAction =>
  action(RaceActionTypes.SET_NAME, name);
export const setTrack = (track: ITrack): IBaseAction =>
  action(RaceActionTypes.SET_TRACK, track);
export const setCar = (car: ICar): IBaseAction =>
  action(RaceActionTypes.SET_CAR, car);

export const setStints = (stints: Stint[]) =>
  action(RaceActionTypes.SET_STINTS, stints);
export const resetRace = () => action(RaceActionTypes.RESET, {});

export const computeQuickProposal = (
  param: ISimpleRaceProposalParam
): IBaseAction => action(RaceActionTypes.SAGA_QUICK_PROPOSAL, param);
