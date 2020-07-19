export interface IDriver {
  id: number;
  name: string;
  baseLaptime: number; // in seconds ()
  fuelPerLap: number;
  backgroundColor?: string;
}

export const defaultDriver: IDriver = {
  id: 0,
  name: "NoName",
  baseLaptime: 60.0,
  fuelPerLap: 3.0,
  backgroundColor: "#73D8FF",
};

export enum DriverActionTypes {
  UPDATE_DEFAULT_DRIVER = "@@driver/UPDATE_DEFAULT_DRIVER",
  ADD_NEW_DRIVER = "@@driver/ADD_NEW_DRIVER",
  UPDATE_DRIVER = "@@driver/UPDATE_DRIVER",
  REMOVE_DRIVER = "@@driver/REMOVE_DRIVER",
  REPLACE = "@@driver/REPLACE",
}

export interface DriverState {
  readonly currentDriver: IDriver;
  readonly allDrivers: IDriver[];
}
