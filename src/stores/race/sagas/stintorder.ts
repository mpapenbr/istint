import arrayMove from "array-move";
import { put, select } from "redux-saga/effects";
import { ApplicationState } from "../..";
import { IBaseAction } from "../../../commons";
import { recomputeRaceStints } from "../compute";
import { IMoveStint, ITimedRace, RaceActionTypes } from "../types";

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
