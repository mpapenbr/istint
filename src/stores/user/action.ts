import { action } from "typesafe-actions";
import { MyEvent } from "../../api/events";
import { IBaseAction } from "../../commons";
import { UserActionTypes } from "./types";

export const userLogin = (): IBaseAction => action(UserActionTypes.LOGIN, {});
export const userAuthData = (data: Keycloak.KeycloakInstance): IBaseAction => action(UserActionTypes.AUTH_DATA, data);
export const userEventList = (events: MyEvent[]): IBaseAction => action(UserActionTypes.USER_EVENTS, events);
export const fetchUserEvents = (): IBaseAction => action(UserActionTypes.SAGA_FETCH_USER_EVENTS, {});
export const fetchUserEventsStarted = (): IBaseAction => action(UserActionTypes.FETCH_USER_EVENTS_STARTED, {});
