import arrayMove from "array-move";
import { put, select } from "redux-saga/effects";
import { ApplicationState } from "../..";
import { IBaseAction } from "../../../commons";
import { IDriver } from "../../driver/types";
import { recomputeRaceStints } from "../compute";
import { IChangeStintDriver, IMoveStint, ITimedRace, RaceActionTypes } from "../types";

export function* handleMoveStint(
  action: IBaseAction
): //: Generator<StrictEffect,void, Stint[]>
Generator {
  try {
    const param = action.payload as IMoveStint;

    const raceData: ITimedRace = (yield select((state: ApplicationState) => state.race.data)) as ITimedRace;

    const newStints = arrayMove(raceData.stints, param.oldIndex, param.newIndex);
    newStints.forEach((v, i) => (v.no = i + 1)); // renumber the stint no
    const stints = recomputeRaceStints({ ...raceData, stints: newStints });
    yield put({ type: RaceActionTypes.SET_STINTS, payload: stints });
  } catch (e) {
    console.log(e);
  }
}

export function* handleChangeStintDriver(
  action: IBaseAction
): //: Generator<StrictEffect,void, Stint[]>
Generator {
  try {
    const param = action.payload as IChangeStintDriver;

    const raceData: ITimedRace = (yield select((state: ApplicationState) => state.race.data)) as ITimedRace;
    const driverData: IDriver[] = (yield select((state: ApplicationState) => state.driver.allDrivers)) as IDriver[];
    const newStints = raceData.stints.slice();
    const toChange = newStints.find((s) => s.no === param.no);
    const toChangeDriver = driverData.find((d) => d.name === param.name);
    if (toChange !== undefined && toChangeDriver !== undefined) {
      toChange.driver.name = toChangeDriver.name;
      toChange.driver.baseLaptime = toChangeDriver.baseLaptime;
      toChange.driver.fuelPerLap = toChangeDriver.fuelPerLap;
      const stints = recomputeRaceStints({ ...raceData, stints: newStints });
      yield put({ type: RaceActionTypes.SET_STINTS, payload: stints });
    }
  } catch (e) {
    console.log(e);
  }
}
