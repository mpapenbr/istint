import Keycloak from "keycloak-js";
import { MyEvent } from "../../api/events";

export interface IUser {
  id: string;
  name: string;
  token: string;
  keycloak?: Keycloak.KeycloakInstance;
  events: MyEvent[];
}

export const defaultUser: IUser = {
  id: "",
  name: "",
  token: "",
  events: [],
};

export enum UserActionTypes {
  LOGIN = "@@user/LOGIN",
  AUTH_DATA = "@@user/AUTH_DATA",
  SAGA_FETCH_USER_EVENTS = "@@user/SAGA_FETCH_USER_EVENTS",
  SAGA_FETCH_EVENT = "@@user/SAGA_FETCH_EVENT", // loads single "own" event
  SAGA_FETCH_SHARED_EVENT = "@@user/SAGA_FETCH_SHARED_EVENT", // loads shared event
  SAGA_UPDATE_EVENT = "@@user/SAGA_UPDATE_EVENT", // update race data with data from event
  FETCH_USER_EVENTS_STARTED = "@@user/FETCH_USER_EVENTS_STARTED",
  USER_EVENTS = "@@user/USER_EVENTS",
  LOGOUT = "@@user/LOGOUT",
}

export interface IUserState {
  readonly data: IUser;
}
