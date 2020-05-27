import {Stint} from '../stint/types'
import { ICar, defaultCar } from '../car/types';
import { IDriver } from '../driver/types';

export interface ITimedRace extends IRace {
    duration: number //unit: minutes
    car: ICar
    stints: Stint[]
}

export const defaultTimedRace : ITimedRace = {
    name: "unnamed race",
    duration: 0,
    car: defaultCar,
    stints: []
}


export interface IRace {
    name: string
}

/**
 * use this if a row is modified in an already computed stint table.
 */
export interface IModifyStintParam {
    no: number,
    driver: IDriver,
    numLaps: number,
}

/**
 * use this if a "simple" computation is needed
 */
export interface ISimpleRaceProposalParam {
    name: string,
    duration: number,
    driver: IDriver
}

export enum RaceActionTypes {
    SET_DURATION = '@@race/SET_DURATION',
    SET_NAME = '@@race/SET_NAME',
    COMPUTE_RACE = '@@race/COMPUTE_RACE',
    SET_STINTS = '@@race/SET_STINTS',
    
    SAGA_TEST = '@@race/SAGA_TEST',
    SAGA_TEST_DOUBLE = '@@race/SAGA_TEST_DOUBLE',
    SAGA_COMPUTE_PROPOSAL = '@@race/SAGA_COMPUTE_PROPOSAL',
    SAGA_CHANGE_SINGLE_STINT = '@@race/SAGA_CHANGE_SINGLE_STINT',
    SAGA_QUICK_PROPOSAL = '@@race/SAGA_QUICK_PROPOSAL',
}

export interface IRaceState {
    readonly data : ITimedRace
}