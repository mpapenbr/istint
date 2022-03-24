import { arrayMoveImmutable } from "array-move";
import { Reducer } from "redux";
import { v4 as uuidv4 } from "uuid";
import { defaultStint } from "../stint/reducer";
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
      const newStints = arrayMoveImmutable(state.data.stints, param.oldIndex, param.newIndex);
      newStints.forEach((v, i) => (v.no = i + 1));
      return {
        ...state,
        data: { ...state.data, stints: newStints },
      };
    }

    case RaceActionTypes.ADD_STINT: {
      const newStints = state.data.stints.slice();
      newStints.push({ ...defaultStint, no: newStints.length + 1 });
      return { ...state, data: { ...state.data, stints: newStints } };
    }

    case RaceActionTypes.REMOVE_STINT: {
      const param = action.payload; // stintNo as param
      const newStints = state.data.stints.slice();
      newStints.splice(param - 1, 1); // stintNo is 1-based
      newStints.forEach((v, i) => (v.no = i + 1)); // renumber
      return { ...state, data: { ...state.data, stints: newStints } };
    }

    case RaceActionTypes.RESET: {
      return { ...initialState, data: { ...defaultTimedRace, id: uuidv4() } };
    }
    case RaceActionTypes.REPLACE: {
      return { ...state, data: { ...action.payload } };
    }

    default:
      return state;
  }
};

export { reducer as raceReducer, initialState as raceInitialState };
