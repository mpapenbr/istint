import { defaultCar, ICar } from "../car/types";
import { IDriver } from "../driver/types";
import { RaceStrategyMode, Stint } from "../stint/types";
import { defaultTrack, ITrack } from "../track/types";

export interface ITimedRace extends IRace {
  duration: number; //unit: minutes
  car: ICar;
  track: ITrack;
  stints: Stint[];
  startReal: Date;
  startSim: Date;
}

export const defaultTimedRace: ITimedRace = {
  name: "unnamed race",
  duration: 0,
  car: defaultCar,
  track: defaultTrack,
  stints: [],
  startReal: new Date(),
  startSim: new Date(),
};

export interface IRace {
  name: string;
}

/**
 * use this if a row is modified in an already computed stint table.
 */
export interface IModifyStintParam {
  no: number;
  driver: IDriver;
  numLaps: number;
}

/**
 * use this if a "simple" computation is needed
 */
export interface ISimpleRaceProposalParam {
  name: string;
  duration: number;
  driver: IDriver[];
  strategy: RaceStrategyMode;
}
/**
 * This container is used, when a single stint attribute is changed (for example by user-modification in the table)
 */
export interface IChangeSingleStintParam {
  no: number;
  value: number | boolean;
}

/**
 * parameter class when a stint is moved.
 * Note: the values refer to the index position, not the stint no
 */
export interface IMoveStint {
  oldIndex: number;
  newIndex: number;
}

export interface IChangeStintDriver {
  /**
   * stint no
   */
  no: number;
  /**
   * driverId for lookup in driver state
   */
  id: number;
}

export enum RaceActionTypes {
  SET_DURATION = "@@race/SET_DURATION",
  SET_NAME = "@@race/SET_NAME",
  SET_CAR = "@@race/SET_CAR",
  SET_TRACK = "@@race/SET_TRACK",
  SET_START_REAL = "@@race/SET_START_REAL",
  SET_START_SIM = "@@race/SET_START_SIM",
  COMPUTE_RACE = "@@race/COMPUTE_RACE",
  SET_STINTS = "@@race/SET_STINTS",
  SET_PARAM = "@@race/SET_PARAM",
  RESET = "@@race/RESET",
  REPLACE = "@@race/REPLACE",
  MOVE_STINT = "@@race/MOVE_STINT",

  SAGA_TEST = "@@race/SAGA_TEST",
  SAGA_TEST_DOUBLE = "@@race/SAGA_TEST_DOUBLE",
  SAGA_COMPUTE_PROPOSAL = "@@race/SAGA_COMPUTE_PROPOSAL",
  SAGA_CHANGE_SINGLE_STINT = "@@race/SAGA_CHANGE_SINGLE_STINT",
  SAGA_QUICK_PROPOSAL = "@@race/SAGA_QUICK_PROPOSAL",
  SAGA_CHANGE_CAR = "@@race/SAGA_CHANGE_CAR",
  SAGA_CHANGE_TRACK = "@@race/SAGA_CHANGE_TRACK",
  SAGA_CHANGE_DURATION = "@@race/SAGA_CHANGE_DURATION",
  SAGA_CHANGE_START_REAL = "@@race/SAGA_START_REAL",
  SAGA_CHANGE_START_SIM = "@@race/SAGA_START_SIM",
  SAGA_CHANGE_STINT_ATTRIBUTE_NUMLAPS = "@@race/SAGA_CHANGE_STINT_ATTRIBUTE_NUMLAPS",
  SAGA_CHANGE_STINT_ATTRIBUTE_FUELPERLAP = "@@race/SAGA_CHANGE_STINT_ATTRIBUTE_FUELPERLAP",
  SAGA_CHANGE_STINT_ATTRIBUTE_LAPTIME = "@@race/SAGA_CHANGE_STINT_ATTRIBUTE_LAPTIME",
  SAGA_CHANGE_STINT_ATTRIBUTE_TIRES = "@@race/SAGA_CHANGE_STINT_ATTRIBUTE_TIRES",
  SAGA_CHANGE_STINT_DRIVER = "@@race/SAGA_CHANGE_STINT_DRIVER",
  SAGA_MOVE_STINT = "@@race/SAGA_MOVE_STINT",
}

export interface IRaceState {
  readonly data: ITimedRace;
}
