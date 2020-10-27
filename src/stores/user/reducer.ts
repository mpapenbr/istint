import { Reducer } from "redux";
import { defaultUser, IUserState, UserActionTypes } from "./types";

const initialState: IUserState = {
  data: defaultUser,
};

const reducer: Reducer<IUserState> = (state = initialState, action) => {
  switch (action.type) {
    case UserActionTypes.AUTH_DATA: {
      const kData = action.payload; //  as Keycloak.KeycloakInstance;
      const ret = {
        ...state,
        data: { ...state.data, id: kData.subject || "", token: kData.token || "", keycloak: kData },
      };
      return ret;
    }

    case UserActionTypes.FETCH_USER_EVENTS_STARTED: {
      console.log("Fetching has started...");
      return state;
    }
    case UserActionTypes.USER_EVENTS: {
      console.log("got user events");
      const data = action.payload;
      console.log({ data });
      const ret = { data: { ...state.data, events: action.payload } };
      return ret;
    }

    default:
      return state;
  }
};

export { reducer as userReducer, initialState as uiInitialState };
