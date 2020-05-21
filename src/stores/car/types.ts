
export interface ICar  {
    name: string,
    tank: number,
}

export const defaultCar : ICar = {
    name: "DefaultCar",
    tank: 100
}

export enum CarActionTypes {
    UPDATE_DEFAULT_CAR = '@@car/UPDATE_DEFAULT_CAR',
    
    
}

export interface CarState {
    readonly data: ICar
}

