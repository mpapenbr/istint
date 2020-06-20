import { Reducer } from "redux";
import { defaultDriver, DriverActionTypes, DriverState } from "./types";

const initialState: DriverState = {
  currentDriver: defaultDriver,
  allDrivers: [],
};

const reducer: Reducer<DriverState> = (state = initialState, action) => {
  switch (action.type) {
    // als Idee: hier könnte ein Saga zum Einsatz kommen: Parameter von Driver ändern sich und dann muss das Race neu berechnet werden.
    case DriverActionTypes.UPDATE_DEFAULT_DRIVER:
      const ret = { ...state, currentDriver: action.payload };
      //console.log({...ret})
      return ret;
    case DriverActionTypes.REPLACE: {
      return Object.assign({}, action.payload);
    }
    default:
      return state;
  }
};

export { reducer as driverReducer, initialState as driverInitialState };
