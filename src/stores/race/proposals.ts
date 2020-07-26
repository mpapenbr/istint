import { TireChangeMode } from "../car/types";
import { IDriver } from "../driver/types";
import { defaultPitTime, RaceStrategyMode, Stint, TimeRange } from "../stint/types";
import { computeTimebased } from "./common";
import { ITimedRace } from "./types";

/**
 * How RaceStrategMode works:
 * - ALWAYS_NEW_TIRES
 * @param race configuration of race parameters
 * @param workDrivers use this drivers and assign them according to RaceStrategy
 * @param mode describes the RaceStrategy
 */
export function computeFreshRace(
  race: ITimedRace,
  workDrivers: IDriver[],
  mode: RaceStrategyMode = RaceStrategyMode.SINGLE_STINT
): Stint[] {
  const computeTimeFrame = (ref: Date, durationSec: number): TimeRange => ({
    start: ref,
    end: new Date(ref.getTime() + durationSec * 1000),
  });

  let currentDriverIdx = 0;
  let remainingTime = race.duration * 60;
  let stintNo = 1;
  let stint: Stint = computeTimebased({
    car: race.car,
    driver: workDrivers[currentDriverIdx],
    racetime: remainingTime,
  });
  stint.no = stintNo;
  // remainingTime -= stint.duration; // this amount has to be reduced in any case.
  stint.realTime = computeTimeFrame(race.startReal, stint.duration);
  stint.simTime = computeTimeFrame(race.startSim, stint.duration);
  var retStints: Stint[];
  retStints = [];
  if (stint.duration >= remainingTime) {
    retStints.push(stint);
    return retStints;
  }

  const hasDrivenLastNStints = (numStints: number, driverId: number): boolean => {
    if (retStints.length < numStints) {
      return false;
    }
    let idx = retStints.length - 1;
    let ret = true;
    const x = retStints.slice(retStints.length - numStints, retStints.length);
    return retStints.slice(retStints.length - numStints, retStints.length).every((s) => s.driver.id === driverId);
  };

  const stintsSinceTireChange = (): number => {
    if (retStints.length === 0) {
      return 0;
    }
    var ret = 0;
    var idx = retStints.length - 1;
    while (idx >= 0 && !retStints[idx].wantNewTires) {
      idx--;
      ret++;
    }
    return ret;
  };

  let currentStint = stint;
  remainingTime -= stint.duration;
  while (remainingTime > 0) {
    var nextDriver = workDrivers[currentDriverIdx % workDrivers.length];
    switch (mode) {
      case RaceStrategyMode.SINGLE_STINT:
        nextDriver = workDrivers[++currentDriverIdx % workDrivers.length];
        currentStint.wantNewTires = true;
        break;
      case RaceStrategyMode.DOUBLE_STINT:
        if (hasDrivenLastNStints(1, currentStint.driver.id)) {
          nextDriver = workDrivers[++currentDriverIdx % workDrivers.length];
        }
        currentStint.wantNewTires = true;
        break;
      case RaceStrategyMode.DOUBLE_STINT_TIRES:
        if (stintsSinceTireChange() > 0) {
          if (hasDrivenLastNStints(1, currentStint.driver.id)) {
            nextDriver = workDrivers[++currentDriverIdx % workDrivers.length];
            currentStint.wantNewTires = true;
          }
          // currentStint.wantNewTires = stintNo % 2 === 0 ? true : false;
        } else {
          currentStint.wantNewTires = false;
          const short = workDrivers[currentDriverIdx % workDrivers.length];
          nextDriver = { ...short, baseLaptime: short.baseLaptime + short.doubleStintAdd };
        }
        break;
    }
    const driverChangeTime = nextDriver.name === stint.driver.name ? 0 : 30;
    const preComputationRemainingTime = remainingTime; // we may need this later
    const next = computeTimebased({ car: race.car, driver: nextDriver, racetime: remainingTime - race.track.pitDelta });
    next.no = ++stintNo;
    // now we know how long the next stint will be, lets compute the "real" data for this stint
    let work = {
      pitDelta: race.track.pitDelta,
      changeTires: currentStint.wantNewTires ? race.car.tireChangeTime : 0,
      refill: (next.numLaps * currentStint.driver.fuelPerLap) / race.car.refillRate,
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
    // console.log(currentStint);
    retStints.push(currentStint);
    next.simTime = computeTimeFrame(new Date(currentStint.simTime.end.getTime() + work.total * 1000), next.duration);
    currentStint = next;
    remainingTime -= next.duration + work.total;
    // console.log("remainingTime:", remainingTime);
    if (remainingTime <= 0) {
      const recalc = computeTimebased({
        car: race.car,
        driver: nextDriver,
        racetime: preComputationRemainingTime - work.total,
      });
      recalc.no = stintNo; // this can be used
      recalc.pitTime = defaultPitTime; // clear the times
      recalc.simTime = computeTimeFrame(next.simTime.start, recalc.duration);
      retStints.push(recalc);
    }
  }
  return retStints;
}
