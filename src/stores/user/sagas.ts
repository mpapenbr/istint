import { all, call, put, takeLatest } from "redux-saga/effects";
import { v4 as uuidv4 } from "uuid";
import EventsService, { MyEvent } from "../../api/events";
import { IBaseAction } from "../../commons";
import { replaceDriverState } from "../driver/actions";
import { replaceRace } from "../race/actions";
import { fetchUserEventsStarted, removeFromEvents, updateInEvents, userEventList } from "./action";
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
/**
 * loads a shared event and sets race data. The id is NOT stored and the event will not appear in eventList
 * @param action payload is {token:string, id:string}
 */
function* fetchSharedEvent(
  action: IBaseAction
): //: Generator<StrictEffect,void, Stint[]>
Generator {
  try {
    const { token, id } = action.payload;

    yield call(fetchUserEventsStarted);
    const event = (yield EventsService.event(token, id)) as MyEvent;
    // create a new id
    event.id = uuidv4();
    event.rawData.race.id = event.id;
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
 * use this to store an event.
 *
 * @param action payload is MyEvent
 */
function* storeAndUpdateEvent(
  action: IBaseAction
): //: Generator<StrictEffect,void, Stint[]>
Generator {
  try {
    const { token, event } = action.payload;
    const storedEvent = (yield EventsService.storeEvent(token, event)) as MyEvent;
    yield put(replaceRace(event.rawData.race));
    yield put(replaceDriverState({ currentDriver: event.rawData.drivers[0], allDrivers: event.rawData.drivers }));
    yield put(updateInEvents(storedEvent));
  } catch (e) {
    console.log(e);
  }
}

/**
 * use this to store an event.
 *
 * @param action payload is {token, id}
 */
function* removeEvent(
  action: IBaseAction
): //: Generator<StrictEffect,void, Stint[]>
Generator {
  try {
    const { token, id } = action.payload;
    EventsService.deleteEvent(token, id);

    yield put(removeFromEvents(id));
  } catch (e) {
    console.log(e);
  }
}

export default function* userSaga() {
  yield all([
    yield takeLatest(UserActionTypes.SAGA_FETCH_USER_EVENTS, fetchUserEvents),
    yield takeLatest(UserActionTypes.SAGA_FETCH_SHARED_EVENT, fetchSharedEvent),
    yield takeLatest(UserActionTypes.SAGA_FETCH_EVENT, fetchEvent),
    yield takeLatest(UserActionTypes.SAGA_STORE_AND_UPDATE_EVENT, storeAndUpdateEvent),
    yield takeLatest(UserActionTypes.SAGA_REMOVE_EVENT, removeEvent),
  ]);
}
