import { put, select } from "redux-saga/effects";
import { ApplicationState } from "../..";
import { IBaseAction } from "../../../commons";
import { DriverState } from "../../driver/types";
import { ISettings } from "../../settings/types";
import { setStartReal, setStartSim, setStints } from "../actions";
import { recomputeRaceStints } from "../compute";
import { computeFreshRace } from "../proposals";
import { ITimedRace, RaceActionTypes } from "../types";

const getSettings = (state: ApplicationState): ISettings => state.settings.data;

export function* handleChangeDuration(
  action: IBaseAction
): //: Generator<StrictEffect,void, Stint[]>
Generator {
  try {
    const durationMin: number = action.payload;

    const raceData: ITimedRace = (yield select((state: ApplicationState) => state.race.data)) as ITimedRace;
    const driverState = (yield select((state: ApplicationState) => state.driver)) as DriverState;
    const settings: ISettings = (yield select(getSettings)) as ISettings;
    yield put({ type: RaceActionTypes.SET_DURATION, payload: durationMin });
    let workStints = computeFreshRace(
      { ...raceData, duration: durationMin },
      driverState.allDrivers,
      settings.strategy
    );
    const stints = recomputeRaceStints({ ...raceData, stints: workStints });
    yield put({ type: RaceActionTypes.SET_STINTS, payload: stints });
  } catch (e) {
    console.log(e);
  }
}

export function* handleChangeRaceRealStartTime(
  action: IBaseAction
): //: Generator<StrictEffect,void, Stint[]>
Generator {
  try {
    const startTime: Date = action.payload;

    const raceData: ITimedRace = (yield select((state: ApplicationState) => state.race.data)) as ITimedRace;

    yield put(setStartReal(startTime));
    const stints = recomputeRaceStints({ ...raceData, startReal: startTime });
    yield put(setStints(stints));
  } catch (e) {
    console.log(e);
  }
}
export function* handleChangeRaceSimStartTime(
  action: IBaseAction
): //: Generator<StrictEffect,void, Stint[]>
Generator {
  try {
    const startTime: Date = action.payload;

    const raceData: ITimedRace = (yield select((state: ApplicationState) => state.race.data)) as ITimedRace;

    yield put(setStartSim(startTime));
    const stints = recomputeRaceStints({ ...raceData, startSim: startTime });
    yield put(setStints(stints));
  } catch (e) {
    console.log(e);
  }
}
