import { Dispatch } from "redux";
import { action } from "typesafe-actions";
import EventsService, { MyEvent } from "../../api/events";
import { IBaseAction } from "../../commons";
import { IUser, UserActionTypes } from "./types";

export const userLogin = (): IBaseAction => action(UserActionTypes.LOGIN, {});
export const userAuthData = (data: Keycloak.KeycloakInstance): IBaseAction => action(UserActionTypes.AUTH_DATA, data);
export const userEventList = (events: MyEvent[]): IBaseAction => action(UserActionTypes.USER_EVENTS, events);

export function fetchUserEventList(user: IUser) {
  return function (dispatch: Dispatch) {
    return EventsService.eventList(user.token).then((events) => {
      return dispatch(userEventList(events));
    });
  };
}
