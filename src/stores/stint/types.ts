import { Driver } from "../driver/types";

export interface TimeRange {
    start: number
    end: number    
}

export interface Stint {
    numLaps: number 
    duration: number // in msec
    fuel: number // fuel needed for this stint based on StintParam    
    driver: Driver
    realTime: TimeRange
    simTime: TimeRange
    

}



export interface StintParam {
    avgLaptime: number,
    fuelConsumption: number,
    tank: number
}

export interface TimeBasedStintParam extends StintParam {
    racetime: number
}

export enum StintActionTypes {
    COMPUTE_TIMEBASED = '@@stint/COMPUTE_TIMEBASED',
    COMPUTE_RACE_PROPOSAL = '@@stint/COMPUTE_RACE_PROPOSAL',
    
}

export interface StintState {
    readonly stint: Stint
}

