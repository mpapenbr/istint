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

    case UserActionTypes.UPDATE_IN_EVENTS: {
      const pos = state.data.events.findIndex((ev) => ev.id === action.payload.id);
      if (pos !== -1) {
        const events = state.data.events.slice();
        events[pos] = action.payload;
        const newData = { ...state.data, events: events };
        return { ...state, data: newData };
      } else {
        const events = state.data.events.slice();
        events.push(action.payload);
        const newData = { ...state.data, events: events };
        return { ...state, data: newData };
      }
    }

    case UserActionTypes.REMOVE_FROM_EVENTS: {
      const pos = state.data.events.findIndex((ev) => ev.id === action.payload);
      if (pos !== -1) {
        const events = state.data.events.slice();
        events.splice(pos, 1);
        const newData = { ...state.data, events: events };
        return { ...state, data: newData };
      }
      return state;
    }

    default:
      return state;
  }
};

export { reducer as userReducer, initialState as uiInitialState };
