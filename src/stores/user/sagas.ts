import { all, call, put, select, takeLatest } from "redux-saga/effects";
import { ApplicationState } from "..";
import EventsService, { MyEvent } from "../../api/events";
import { IBaseAction } from "../../commons";
import { fetchUserEventsStarted, userEventList } from "./action";
import { IUserState, UserActionTypes } from "./types";

function* fetchUserEvents(
  action: IBaseAction
): //: Generator<StrictEffect,void, Stint[]>
Generator {
  try {
    const carId: number = action.payload;

    const userState = (yield select((state: ApplicationState) => state.user)) as IUserState;
    yield call(fetchUserEventsStarted);
    const events = yield EventsService.eventList(userState.data.token);
    yield put(userEventList(events as MyEvent[]));
  } catch (e) {
    console.log(e);
  }
}

export default function* userSaga() {
  yield all([yield takeLatest(UserActionTypes.SAGA_FETCH_USER_EVENTS, fetchUserEvents)]);
}
