import { Reducer } from "redux";
import { defaults as sampleCars } from "./defaults";
import { CarActionTypes, CarState, defaultCar } from "./types";

const initialState: CarState = {
  currentCar: defaultCar,
  allCars: sampleCars,
};

const reducer: Reducer<CarState> = (state = initialState, action) => {
  switch (action.type) {
    // als Idee: hier könnte ein Saga zum Einsatz kommen: Parameter von Driver ändern sich und dann muss das Race neu berechnet werden.
    case CarActionTypes.UPDATE_DEFAULT_CAR:
      // Note: this is not valid at the moment.
      const ret = { ...state, data: action.payload };
      //console.log({...ret})
      return ret;
    case CarActionTypes.REPLACE: {
      const ret = Object.assign({}, action.payload);
      // console.log(ret);
      return ret;
    }
    default:
      return state;
  }
};

export { reducer as carReducer, initialState as carInitialState };
