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

export function* handleRemoveStint(
  action: IBaseAction
): //: Generator<StrictEffect,void, Stint[]>
Generator {
  try {
    const param = action.payload as number;

    const raceData: ITimedRace = (yield select((state: ApplicationState) => state.race.data)) as ITimedRace;

    const newStints = raceData.stints.slice();
    newStints.splice(param - 1, 1); // stintNo is 1-based
    newStints.forEach((v, i) => (v.no = i + 1)); // renumber

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
    var toChange = newStints.find((s) => s.no === param.no);
    const toChangeDriver = driverData.find((d) => d.id === param.id);
    if (toChange !== undefined && toChangeDriver !== undefined) {
      toChange.driver = Object.assign({}, toChangeDriver);
      const stints = recomputeRaceStints({ ...raceData, stints: newStints });
      yield put({ type: RaceActionTypes.SET_STINTS, payload: stints });
    }
  } catch (e) {
    console.log(e);
  }
}
