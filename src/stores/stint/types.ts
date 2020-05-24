import { IDriver } from "../driver/types";
import { ICar } from "../car/types";

export interface TimeRange {
    start: Date
    end: Date    
}

export interface Stint {
    no: number;
    numLaps: number  
    duration: number // in msec
    fuel: number // fuel needed for this stint based on StintParam    
    driver: IDriver
    realTime: TimeRange 
    simTime: TimeRange
    

}


//@deprecated  (nur noch für devhelper)
export interface StintParam {
    avgLaptime: number,
    fuelConsumption: number,
    tank: number
}
//@deprecated (nur noch für devhelper)
export interface TimeBasedStintParam extends StintParam {
    racetime: number // in msec!
}

export interface TimeDriverBasedStintParam  {
    driver: IDriver,
    car: ICar,
    racetime: number // in msec
}

export enum StintActionTypes {
    COMPUTE_TIMEBASED = '@@stint/COMPUTE_TIMEBASED',
    COMPUTE_RACE_PROPOSAL = '@@stint/COMPUTE_RACE_PROPOSAL',
    
}

export interface StintState {
    readonly stint: Stint
}

