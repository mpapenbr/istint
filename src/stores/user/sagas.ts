import { all, call, put, takeLatest } from "redux-saga/effects";
import EventsService, { MyEvent } from "../../api/events";
import { IBaseAction } from "../../commons";
import { replaceDriverState } from "../driver/actions";
import { replaceRace } from "../race/actions";
import { fetchUserEventsStarted, userEventList } from "./action";
import { UserActionTypes } from "./types";

function* fetchUserEvents(
  action: IBaseAction
): //: Generator<StrictEffect,void, Stint[]>
Generator {
  try {
    const token: string = action.payload;

    yield call(fetchUserEventsStarted);
    const events = yield EventsService.eventList(token);
    yield put(userEventList(events as MyEvent[]));
  } catch (e) {
    console.log(e);
  }
}

function* fetchSharedEvent(
  action: IBaseAction
): //: Generator<StrictEffect,void, Stint[]>
Generator {
  try {
    const { token, id } = action.payload;

    yield call(fetchUserEventsStarted);
    const event = (yield EventsService.event(token, id)) as MyEvent;
    // do not tranfer the event id to race.id since
    yield put(replaceRace(event.rawData.race));
    yield put(replaceDriverState({ currentDriver: event.rawData.drivers[0], allDrivers: event.rawData.drivers }));
  } catch (e) {
    console.log(e);
  }
}

/**
 * use this to fetch an event from the server and put it into the the state
 * @param action
 */
function* fetchEvent(
  action: IBaseAction
): //: Generator<StrictEffect,void, Stint[]>
Generator {
  try {
    const { token, id } = action.payload;

    const event = (yield EventsService.event(token, id)) as MyEvent;
    event.rawData.race.id = id; // this is one of the user's event. so keep the id
    yield put(replaceRace(event.rawData.race));
    yield put(replaceDriverState({ currentDriver: event.rawData.drivers[0], allDrivers: event.rawData.drivers }));
  } catch (e) {
    console.log(e);
  }
}

/**
 * use this to update the state with the current event data
 * @param action
 */
function* updateEvent(
  action: IBaseAction
): //: Generator<StrictEffect,void, Stint[]>
Generator {
  try {
    const event = action.payload;
    yield put(replaceRace(event.rawData.race));
    yield put(replaceDriverState({ currentDriver: event.rawData.drivers[0], allDrivers: event.rawData.drivers }));
  } catch (e) {
    console.log(e);
  }
}

export default function* userSaga() {
  yield all([
    yield takeLatest(UserActionTypes.SAGA_FETCH_USER_EVENTS, fetchUserEvents),
    yield takeLatest(UserActionTypes.SAGA_FETCH_SHARED_EVENT, fetchSharedEvent),
    yield takeLatest(UserActionTypes.SAGA_FETCH_EVENT, fetchEvent),
    yield takeLatest(UserActionTypes.SAGA_UPDATE_EVENT, updateEvent),
  ]);
}
