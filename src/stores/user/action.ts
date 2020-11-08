import { action } from "typesafe-actions";
import { MyEvent } from "../../api/events";
import { IBaseAction } from "../../commons";
import { UserActionTypes } from "./types";

export const userLogin = (): IBaseAction => action(UserActionTypes.LOGIN, {});
export const userAuthData = (data: Keycloak.KeycloakInstance): IBaseAction => action(UserActionTypes.AUTH_DATA, data);
export const userEventList = (events: MyEvent[]): IBaseAction => action(UserActionTypes.USER_EVENTS, events);
export const fetchUserEvents = (token: string): IBaseAction => action(UserActionTypes.SAGA_FETCH_USER_EVENTS, token);
export const fetchSharedEvent = (token: string, id: string): IBaseAction =>
  action(UserActionTypes.SAGA_FETCH_SHARED_EVENT, { token, id });
export const fetchEvent = (token: string, id: string): IBaseAction =>
  action(UserActionTypes.SAGA_FETCH_EVENT, { token, id });
export const updateEvent = (event: MyEvent): IBaseAction => action(UserActionTypes.SAGA_UPDATE_EVENT, event);
export const fetchUserEventsStarted = (): IBaseAction => action(UserActionTypes.FETCH_USER_EVENTS_STARTED, {});