import { defaultCar, ICar } from "../../car/types";
import { defaultDriver, IDriver } from "../../driver/types";
import { RaceStrategyMode } from "../../stint/types";
import { computeFreshRace } from "../proposals";
import { defaultTimedRace, ITimedRace } from "../types";

describe("check sample race proposals", () => {
  // base test data
  const testDefaultCar: ICar = { ...defaultCar, tank: 100 };
  const singleDriver: IDriver = { ...defaultDriver, id: 1, baseLaptime: 90, fuelPerLap: 3, doubleStintAdd: 1 };
  const sampleRaceData: ITimedRace = { ...defaultTimedRace, car: testDefaultCar };

  const driverOnSecondStint = (d: IDriver): IDriver => {
    const ret = { ...d, baseLaptime: d.baseLaptime + d.doubleStintAdd };
    return ret;
  };
  it("computes with one driver, single stints", () => {
    const raceData: ITimedRace = { ...sampleRaceData, duration: 60 };

    const stints = computeFreshRace(raceData, [singleDriver], RaceStrategyMode.SINGLE_STINT);
    // should result in 2 stints.
    expect(stints).toMatchObject([
      { no: 1, numLaps: 33, driver: singleDriver },
      { no: 2, numLaps: 7, driver: singleDriver },
    ]);
  });

  it("computes with two drivers, single stints", () => {
    const raceData: ITimedRace = { ...sampleRaceData, duration: 120 };
    const otherDriver: IDriver = { ...defaultDriver, id: 2, baseLaptime: 90, fuelPerLap: 3, name: "Other driver" };
    const stints = computeFreshRace(raceData, [singleDriver, otherDriver], RaceStrategyMode.SINGLE_STINT);
    // increased race duration to get the toggling back to first driver
    expect(stints).toMatchObject([
      { no: 1, numLaps: 33, driver: singleDriver },
      { no: 2, numLaps: 33, driver: otherDriver },
      { no: 3, numLaps: 13, driver: singleDriver },
    ]);
  });
  it("computes with one driver, do double stint ", () => {
    // double stint: one driver does 2 stints, gets fresh tires each time
    const raceData: ITimedRace = { ...sampleRaceData, duration: 60 };

    const stints = computeFreshRace(raceData, [singleDriver], RaceStrategyMode.DOUBLE_STINT);
    // should result in 2 stints.
    expect(stints).toMatchObject([
      { no: 1, numLaps: 33, duration: 2970, driver: singleDriver },
      { no: 2, numLaps: 7, duration: 630, driver: singleDriver },
    ]);
  });

  it("computes with two drivers, double stints", () => {
    const raceData: ITimedRace = { ...sampleRaceData, duration: 120 };
    const otherDriver: IDriver = { ...singleDriver, id: 2, name: "Other driver" };
    const stints = computeFreshRace(raceData, [singleDriver, otherDriver], RaceStrategyMode.DOUBLE_STINT);
    // increased race duration to get the toggling back to first driver
    expect(stints).toMatchObject([
      { no: 1, numLaps: 33, driver: singleDriver },
      { no: 2, numLaps: 33, driver: singleDriver },
      { no: 3, numLaps: 13, driver: otherDriver },
    ]);
  });

  it("computes with one driver, do double stint tires ", () => {
    // double stint: one driver does 2 stints, gets fresh tires each time
    const raceData: ITimedRace = { ...sampleRaceData, duration: 60 };

    const stints = computeFreshRace(raceData, [singleDriver], RaceStrategyMode.DOUBLE_STINT_TIRES);
    // should result in 2 stints. duration of stint 2 is one sec longer per lap
    expect(stints).toMatchObject([
      { no: 1, numLaps: 33, duration: 2970, driver: singleDriver },
      {
        no: 2,
        numLaps: 7,
        duration: 637,
        driver: driverOnSecondStint(singleDriver),
      },
    ]);
  });

  it("computes with two drivers, do double stints tires", () => {
    const raceData: ITimedRace = { ...sampleRaceData, duration: 120 };
    const otherDriver: IDriver = { ...singleDriver, id: 2, name: "Other driver" };
    const stints = computeFreshRace(raceData, [singleDriver, otherDriver], RaceStrategyMode.DOUBLE_STINT_TIRES);

    expect(stints).toMatchObject([
      { no: 1, numLaps: 33, duration: 2970, driver: singleDriver },
      { no: 2, numLaps: 33, duration: 3003, driver: driverOnSecondStint(singleDriver) },
      { no: 3, numLaps: 13, driver: otherDriver },
    ]);
  });

  it("computes with single driver, do double stints tires, 4 stints", () => {
    const raceData: ITimedRace = { ...sampleRaceData, duration: 180 };

    const stints = computeFreshRace(raceData, [singleDriver], RaceStrategyMode.DOUBLE_STINT_TIRES);

    expect(stints).toMatchObject([
      { no: 1, numLaps: 33, duration: 2970, driver: singleDriver, wantNewTires: false },
      { no: 2, numLaps: 33, duration: 3003, driver: driverOnSecondStint(singleDriver), wantNewTires: true },
      { no: 3, numLaps: 33, duration: 2970, driver: singleDriver, wantNewTires: false },
      { no: 4, numLaps: 19, duration: 1729, driver: driverOnSecondStint(singleDriver), wantNewTires: false },
    ]);
  });

  it("computes with 2 driver, do double stints tires, 4h race", () => {
    const raceData: ITimedRace = { ...sampleRaceData, duration: 240 };
    const otherDriver: IDriver = { ...singleDriver, id: 2, name: "Other driver" };
    const stints = computeFreshRace(raceData, [singleDriver, otherDriver], RaceStrategyMode.DOUBLE_STINT_TIRES);

    expect(stints).toMatchObject([
      { no: 1, numLaps: 33, duration: 2970, driver: singleDriver, wantNewTires: false },
      { no: 2, numLaps: 33, duration: 3003, driver: driverOnSecondStint(singleDriver), wantNewTires: true },
      { no: 3, numLaps: 33, duration: 2970, driver: otherDriver, wantNewTires: false },
      { no: 4, numLaps: 33, duration: 3003, driver: driverOnSecondStint(otherDriver), wantNewTires: true },
      { no: 5, numLaps: 25, duration: 2250, driver: singleDriver, wantNewTires: false },
    ]);
  });
});
