export interface IDriver {
  name: string;
  baseLaptime: number; // in seconds ()
  fuelPerLap: number;
}

export const defaultDriver: IDriver = {
  name: "NoName",
  baseLaptime: 60.0,
  fuelPerLap: 3.0,
};

export enum DriverActionTypes {
  UPDATE_DEFAULT_DRIVER = "@@driver/UPDATE_DEFAULT_DRIVER",
  REPLACE = "@@driver/REPLACE",
}

export interface DriverState {
  readonly currentDriver: IDriver;
  readonly allDrivers: IDriver[];
}
