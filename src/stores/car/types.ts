
export enum TireChangeMode {
    DURING_REFILL,
    AFTER_REFILL
}

export interface ICar  {
    name: string,
    tank: number, // in liter
    refillRate: number, // liters per second
    tireChangeMode: TireChangeMode
}

export const defaultCar : ICar = {
    name: "DefaultCar",
    tank: 100,
    refillRate: 2.7,
    tireChangeMode: TireChangeMode.AFTER_REFILL,
}

export enum CarActionTypes {
    UPDATE_DEFAULT_CAR = '@@car/UPDATE_DEFAULT_CAR',
    
    
}

export interface CarState {
    readonly data: ICar
}

