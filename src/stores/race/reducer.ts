import { Reducer } from "redux";
import { defaultTimedRace, IRaceState, RaceActionTypes } from "./types";

const initialState: IRaceState = {
  data: defaultTimedRace,
};

const reducer: Reducer<IRaceState> = (state = initialState, action) => {
  switch (action.type) {
    case RaceActionTypes.SET_DURATION: {
      return { ...state, data: { ...state.data, duration: action.payload } };
    }

    case RaceActionTypes.SET_NAME: {
      return { ...state, data: { ...state.data, name: action.payload } };
    }

    case RaceActionTypes.SET_CAR: {
      return { ...state, data: { ...state.data, car: action.payload } };
    }
    case RaceActionTypes.SET_TRACK: {
      return { ...state, data: { ...state.data, track: action.payload } };
    }

    case RaceActionTypes.SET_STINTS: {
      return { ...state, data: { ...state.data, stints: action.payload } };
    }

    case RaceActionTypes.RESET: {
      return initialState;
    }

    default:
      return state;
  }
};

export { reducer as raceReducer, initialState as raceInitialState };
