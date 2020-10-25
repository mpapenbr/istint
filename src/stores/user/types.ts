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
  USER_EVENTS = "@@user/USER_EVENTS",
  LOGOUT = "@@user/LOGOUT",
}

export interface IUserState {
  readonly data: IUser;
}
