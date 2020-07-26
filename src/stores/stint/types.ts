import { ICar } from "../car/types";
import { IDriver } from "../driver/types";

export interface TimeRange {
  start: Date;
  end: Date;
}
export interface IPitTime {
  pitDelta: number; // time lost in pits when just stopping at pit (similar to a stop&go penalty, no actions done in pit box)
  changeTires: number;
  refill: number;
  driverChange: number;
  total: number;
}

export const defaultPitTime: IPitTime = {
  pitDelta: 0,
  changeTires: 0,
  refill: 0,
  driverChange: 0,
  total: 0,
};

export interface IStintProblem {
  type: string;
  msg: string;
}

/**
 * Contains data that are computed after the computation ;)
 */
export interface IRollingData {
  elapsedLaps: number; // laps driven so far
  elapsedTime: number; // race duration so far (in sec)
  driverLaps: number; // laps driven by driver since last driver change
  driverTime: number; // driver seat time since last driver change
}
export const defaultRollingData: IRollingData = {
  driverLaps: 0,
  driverTime: 0,
  elapsedLaps: 0,
  elapsedTime: 0,
};

export interface Stint {
  no: number;
  numLaps: number;
  duration: number; // in msec
  fuel: number; // fuel needed for this stint based on StintParam
  driver: IDriver;
  wantNewTires: boolean;
  realTime: TimeRange;
  simTime: TimeRange;

  /**
   * values given in seconds
   */
  pitTime: IPitTime;
  /**
   * if there are any problems during computation they are stored here.
   */
  problems: IStintProblem[];
  rollingData: IRollingData;
}

export enum RaceStrategyMode {
  /**
   * Change driver and tires on each stint
   */
  SINGLE_STINT,
  /**
   * drivers do double stint, but gets new tires
   */
  DOUBLE_STINT,
  /**
   * drivers do double stint without changing tires
   */
  DOUBLE_STINT_TIRES,
}

//@deprecated  (nur noch für devhelper)
export interface StintParam {
  avgLaptime: number;
  fuelConsumption: number;
  tank: number;
}
//@deprecated (nur noch für devhelper)
export interface TimeBasedStintParam extends StintParam {
  racetime: number; // in msec!
}

export interface TimeDriverBasedStintParam {
  driver: IDriver;
  car: ICar;
  racetime: number; // in msec
}

export enum StintActionTypes {
  COMPUTE_TIMEBASED = "@@stint/COMPUTE_TIMEBASED",
  COMPUTE_RACE_PROPOSAL = "@@stint/COMPUTE_RACE_PROPOSAL",
}

export interface StintState {
  readonly stint: Stint;
}
