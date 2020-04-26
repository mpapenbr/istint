
export interface Driver {
    name: string,
    baseLaptime: number
    fuelPerLap: number
}


export enum DriverActionTypes {
    COMPUTE_TIMEBASED = '@@driver/COMPUTE_TIMEBASED',
    COMPUTE_RACE_PROPOSAL = '@@driver/COMPUTE_RACE_PROPOSAL',
    
}

export interface DriverState {
    readonly driver: Driver
}

