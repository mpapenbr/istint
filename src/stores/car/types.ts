export enum TireChangeMode {
  DURING_REFILL,
  AFTER_REFILL,
}

export interface ICar {
  id: number;
  name: string;
  tank: number; // in liter
  refillRate: number; // liters per second
  tireChangeMode: TireChangeMode;
  tireChangeTime: number; // in seconds (for all 4 tires)
}

export const defaultCar: ICar = {
  id: 0,
  name: "DefaultCar",
  tank: 100,
  refillRate: 2.7,
  tireChangeMode: TireChangeMode.AFTER_REFILL,
  tireChangeTime: 27,
};

export enum CarActionTypes {
  UPDATE_DEFAULT_CAR = "@@car/UPDATE_DEFAULT_CAR", // just for testing, will be removed
  REPLACE = "@@car/REPLACE", // will replace car data in store
}

export interface CarState {
  readonly currentCar: ICar;
  readonly allCars: ICar[];
}
