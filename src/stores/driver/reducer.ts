import _ from "lodash";
import { Reducer } from "redux";
import { sampleDrivers } from "./defaults";
import { defaultDriver, DriverActionTypes, DriverState } from "./types";

const initialState: DriverState = {
  currentDriver: defaultDriver,
  allDrivers: sampleDrivers,
};

const reducer: Reducer<DriverState> = (state = initialState, action) => {
  switch (action.type) {
    // als Idee: hier könnte ein Saga zum Einsatz kommen: Parameter von Driver ändern sich und dann muss das Race neu berechnet werden.
    case DriverActionTypes.UPDATE_DEFAULT_DRIVER:
      const ret = { ...state, currentDriver: action.payload };
      //console.log({...ret})
      return ret;

    case DriverActionTypes.ADD_NEW_DRIVER: {
      const newDrivers = state.allDrivers.slice();
      const currentMax = _.maxBy(newDrivers, (d) => d.id);
      const newId = currentMax ? currentMax.id + 1 : 1;
      const newDriverData = { ...defaultDriver, name: "New driver", id: newId };
      newDrivers.push(newDriverData);
      return { ...state, allDrivers: newDrivers };
    }

    case DriverActionTypes.UPDATE_DRIVER:
      const newDrivers = state.allDrivers.slice();
      const updatedDriver = action.payload;

      const idx = newDrivers.findIndex((d) => d.id === updatedDriver.id);
      if (idx !== -1) {
        newDrivers[idx] = updatedDriver;
      }
      return { ...state, allDrivers: newDrivers };

    case DriverActionTypes.REMOVE_DRIVER: {
      const toRemoveId = action.payload;
      const newDrivers = state.allDrivers.slice();
      const itemIdx = newDrivers.findIndex((d) => d.id === toRemoveId);
      if (itemIdx !== -1) {
        newDrivers.splice(itemIdx, 1);
      }
      return { ...state, allDrivers: newDrivers };
    }
    case DriverActionTypes.REPLACE: {
      return Object.assign({}, action.payload);
    }
    default:
      return state;
  }
};

export { reducer as driverReducer, initialState as driverInitialState };
