
export interface Stint {
    numLaps: number
    duration: number
    fuel: number
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

