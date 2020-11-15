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

  SAGA_STORE_AND_UPDATE_EVENT = "@@user/SAGA_SAVE_AND_UPDATE_EVENT", // stores event to db and updates event list
  SAGA_REMOVE_EVENT = "@@user/SAGA_REMOVE_EVENT", // deletes an event from the database and event list
  FETCH_USER_EVENTS_STARTED = "@@user/FETCH_USER_EVENTS_STARTED",
  USER_EVENTS = "@@user/USER_EVENTS",
  UPDATE_IN_EVENTS = "@@user/UPDATE_IN_EVENTS",
  REMOVE_FROM_EVENTS = "@@user/REMOVE_FROM_EVENTS",
  LOGOUT = "@@user/LOGOUT",
}

export interface IUserState {
  readonly data: IUser;
}
