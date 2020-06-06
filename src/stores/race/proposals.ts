import { ITimedRace } from "./types";
import { Stint, RaceStrategyMode, TimeRange, defaultPitTime } from "../stint/types";
import { TireChangeMode } from '../car/types';
import { IDriver } from "../driver/types";
import { computeTimebased } from "./common";


export function computeFreshRace(race: ITimedRace, driver: IDriver, mode: RaceStrategyMode = RaceStrategyMode.ALWAYS_NEW_TIRES): Stint[] {
    const computeTimeFrame = (ref: Date, durationSec: number): TimeRange => ({
        start: ref,
        end: new Date(ref.getTime() + durationSec * 1000),
    });
    let remainingTime = race.duration * 60;
    let stintNo = 1;
    let stint: Stint = computeTimebased({ car: race.car, driver: driver, racetime: remainingTime });
    stint.no = stintNo;
    // remainingTime -= stint.duration; // this amount has to be reduced in any case.
    stint.realTime = computeTimeFrame(new Date("2015-03-25T12:00:00Z"), stint.duration);
    stint.simTime = computeTimeFrame(new Date("2015-03-25T12:00:00Z"), stint.duration);
    let ret = [];
    if (stint.duration >= remainingTime) {
        ret.push(stint);
        return ret;
    }
    let currentStint = stint;
    remainingTime -= stint.duration;
    while (remainingTime > 0) {
        const nextDriver = driver; // TODO: berechnen
        const driverChangeTime = nextDriver.name === stint.driver.name ? 0 : 30;
        switch (mode) {
            case RaceStrategyMode.ALWAYS_NEW_TIRES:
                currentStint.wantNewTires = true;
                break;
            case RaceStrategyMode.DOUBLE_STINT_TIRES:
                currentStint.wantNewTires = (stintNo % 2 === 0) ? true : false;
                break;
        }
        const preComputationRemainingTime = remainingTime; // we may need this later
        const next = computeTimebased({ car: race.car, driver: nextDriver, racetime: (remainingTime - race.track.pitDelta) });
        next.no = ++stintNo;
        // now we know how long the next stint will be, lets compute the "real" data for this stint
        let work = {
            pitDelta: race.track.pitDelta,
            changeTires: currentStint.wantNewTires ? race.car.tireChangeTime : 0,
            refill: ((next.numLaps * currentStint.driver.fuelPerLap) / race.car.refillRate),
            driverChange: driverChangeTime,
            total: 0,
        };
        const pitWorkTime = () => {
            switch (race.car.tireChangeMode) {
                case TireChangeMode.DURING_REFILL:
                    return Math.max(work.driverChange, Math.min(work.changeTires, work.refill));
                case TireChangeMode.AFTER_REFILL:
                    return Math.max(work.driverChange, work.changeTires + work.refill);
            }
        };
        work.total = work.pitDelta + pitWorkTime();
        currentStint.pitTime = work;
        console.log(currentStint);
        ret.push(currentStint);
        next.simTime = computeTimeFrame(new Date(currentStint.simTime.end.getTime() + (work.total * 1000)), next.duration);
        currentStint = next;
        remainingTime -= next.duration + work.total;
        console.log("remainingTime:", remainingTime);
        if (remainingTime <= 0) {
            const recalc = computeTimebased({ car: race.car, driver: nextDriver, racetime: (preComputationRemainingTime - work.total) });
            recalc.no = stintNo;  // this can be used
            recalc.pitTime = defaultPitTime; // clear the times
            recalc.simTime = computeTimeFrame(next.simTime.start, recalc.duration);
            ret.push(recalc);
        }
    }
    return ret;
}
