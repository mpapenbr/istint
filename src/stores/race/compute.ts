import { sprintf } from "sprintf-js";
import { secAsString } from "../../utils/output";
import { TireChangeMode } from "../car/types";
import { defaultPitTime, defaultRollingData, IPitTime, Stint, TimeRange } from "../stint/types";
import { ITimedRace } from "./types";

function pitWorkTime(race: ITimedRace, currentStint: Stint, nextStint: Stint | undefined): IPitTime {
  if (nextStint === undefined) {
    // console.log("returing ", { defaultPitTime });
    return { ...defaultPitTime };
  }
  const work = { ...defaultPitTime };
  work.pitDelta = race.track.pitDelta;
  work.changeTires = currentStint.wantNewTires ? race.car.tireChangeTime : 0;
  work.refill = (nextStint.numLaps * currentStint.driver.fuelPerLap) / race.car.refillRate;
  work.driverChange = nextStint.driver.name === currentStint.driver.name ? 0 : 30;

  switch (race.car.tireChangeMode) {
    case TireChangeMode.DURING_REFILL:
      work.total = work.pitDelta + Math.max(work.driverChange, Math.min(work.changeTires, work.refill));
      break;
    case TireChangeMode.AFTER_REFILL:
      work.total = work.pitDelta + Math.max(work.driverChange, work.changeTires + work.refill);
      break;
  }
  return work;
}

/**
 * when to call? if the user-input data is already present.
 * This method will take the parameter
 * - numLaps
 * - driver.baseLaptime
 * - driver.fuelPerLap
 * - wantNewTires
 *
 * as given and will compute the resulting data
 *
 * @param race
 */
export function recomputeRaceStints(race: ITimedRace): Stint[] {
  const { stints } = race;
  // console.log("recomputeRaceStints", { race }, "stints:", { stints });
  const newStints = Array.from(stints);
  newStints.forEach((s, i) => {
    s.duration = s.numLaps * s.driver.baseLaptime;
    s.fuel = s.numLaps * s.driver.fuelPerLap;
    s.problems = [];

    if (s.fuel > race.car.tank) {
      s.problems = Object.assign(s.problems, [
        { type: "error", msg: sprintf("Required fuel %.2f exceeds tank volume of %.2f", s.fuel, race.car.tank) },
      ]);
      // console.log(s.problems)
    }

    const tmp = pitWorkTime(race, s, i < newStints.length - 1 ? newStints[i + 1] : undefined);
    // console.log(tmp)
    s.pitTime = tmp;

    const computeStartTime = (raceStartTime: Date, extractTimeRange: (s: Stint) => TimeRange): Date => {
      return i === 0
        ? raceStartTime
        : new Date(extractTimeRange(newStints[i - 1]).end.getTime() + newStints[i - 1].pitTime.total * 1000);
    };

    const myRealStartTime = computeStartTime(race.startReal, (s: Stint) => s.realTime);
    const mySimStartTime = computeStartTime(race.startSim, (s: Stint) => s.simTime);

    const compTimeRange = (startTime: Date, duration: number): TimeRange => ({
      start: startTime,
      end: new Date(startTime.getTime() + s.duration * 1000),
    });

    s.simTime = compTimeRange(mySimStartTime, s.duration);
    s.realTime = compTimeRange(myRealStartTime, s.duration);

    var rollingData = Object.assign({}, defaultRollingData);
    rollingData.elapsedLaps = i === 0 ? s.numLaps : newStints[i - 1].rollingData.elapsedLaps + s.numLaps;
    rollingData.elapsedTime += (s.realTime.end.getTime() - race.startReal.getTime()) / 1000;
    //TODO: compute rolling data for current driver
    s.rollingData = rollingData;
  });
  const lastStint = newStints[newStints.length - 1];
  const delta = lastStint.simTime.end.getTime() - newStints[0].simTime.start.getTime() - race.duration * 60 * 1000;
  // console.log("End: ", lastStint.simTime.end.getTime(), " Start: ", newStints[0].simTime.start.getTime());
  // console.log(lastStint.simTime, " - ",  delta)
  if (delta < 0) {
    // console.log(delta)
    lastStint.problems = Object.assign(lastStint.problems, [
      { type: "error", msg: sprintf("Stint ends before end of race by %s", secAsString(Math.abs(delta) / 1000)) },
    ]);
  }
  if (delta > lastStint.driver.baseLaptime * 1000) {
    lastStint.problems = Object.assign(lastStint.problems, [
      {
        type: "error",
        msg: sprintf(
          "Stint exceeds race time by %s. Reduce laps by %d",
          secAsString(Math.abs(delta) / 1000),
          Math.abs(delta) / 1000 / lastStint.driver.baseLaptime
        ),
      },
    ]);
  }
  return newStints;
}
