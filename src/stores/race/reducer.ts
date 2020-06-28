import arrayMove from "array-move";
import { Reducer } from "redux";
import { defaultTimedRace, IMoveStint, IRaceState, RaceActionTypes } from "./types";

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

    case RaceActionTypes.SET_START_REAL: {
      return { ...state, data: { ...state.data, startReal: action.payload } };
    }
    case RaceActionTypes.SET_START_SIM: {
      return { ...state, data: { ...state.data, startSim: action.payload } };
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

    case RaceActionTypes.MOVE_STINT: {
      const param = action.payload as IMoveStint;
      const newStints = arrayMove(state.data.stints, param.oldIndex, param.newIndex);
      newStints.forEach((v, i) => (v.no = i + 1));
      return {
        ...state,
        data: { ...state.data, stints: newStints },
      };
    }

    case RaceActionTypes.RESET: {
      return initialState;
    }
    case RaceActionTypes.REPLACE: {
      return { ...state, data: { ...action.payload } };
    }

    default:
      return state;
  }
};

export { reducer as raceReducer, initialState as raceInitialState };
