import { Stint, TimeDriverBasedStintParam } from "../stint/types";
import _ from 'lodash';
import { defaultStint } from "../stint/reducer";

export const computeTimebased = (param: TimeDriverBasedStintParam): Stint => {
    const numLapsByTime = Math.max(1, Math.ceil(param.racetime / param.driver.baseLaptime));
    const numLapsByTank = Math.floor(param.car.tank / param.driver.fuelPerLap);
    const numLaps = Math.min(numLapsByTank, numLapsByTime);
    const duration = numLaps * param.driver.baseLaptime;
    const fuel = numLaps * param.driver.fuelPerLap;
    return { ...defaultStint, driver: _.clone(param.driver), numLaps: numLaps, duration: duration, fuel: fuel };
};
