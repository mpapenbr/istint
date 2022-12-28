import { action } from "typesafe-actions";
import { MyEvent } from "../../api/events";
import { IBaseAction } from "../../commons";
import { UserActionTypes } from "./types";

export const userLogin = (): IBaseAction => action(UserActionTypes.LOGIN, {});

export const userEventList = (events: MyEvent[]): IBaseAction => action(UserActionTypes.USER_EVENTS, events);
export const updateInEvents = (event: MyEvent): IBaseAction => action(UserActionTypes.UPDATE_IN_EVENTS, event);
export const removeFromEvents = (id: string): IBaseAction => action(UserActionTypes.REMOVE_FROM_EVENTS, id);
export const fetchUserEvents = (token: string): IBaseAction => action(UserActionTypes.SAGA_FETCH_USER_EVENTS, token);
export const fetchSharedEvent = (token: string, id: string): IBaseAction =>
  action(UserActionTypes.SAGA_FETCH_SHARED_EVENT, { token, id });
export const fetchEvent = (token: string, id: string): IBaseAction =>
  action(UserActionTypes.SAGA_FETCH_EVENT, { token, id });

export const removeEvent = (token: string, id: string): IBaseAction =>
  action(UserActionTypes.SAGA_REMOVE_EVENT, { token: token, id: id });
export const storeAndUpdateEvent = (token: string, event: MyEvent): IBaseAction =>
  action(UserActionTypes.SAGA_STORE_AND_UPDATE_EVENT, { token: token, event: event });
export const fetchUserEventsStarted = (): IBaseAction => action(UserActionTypes.FETCH_USER_EVENTS_STARTED, {});
