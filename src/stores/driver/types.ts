
export interface IDriver {
    name: string,
    baseLaptime: number  // in seconds ()
    fuelPerLap: number
}


export enum DriverActionTypes {
    UPDATE_DEFAULT_DRIVER = '@@driver/UPDATE_DEFAULT_DRIVER',
    
    
}

export interface DriverState {
    readonly data: IDriver
}

