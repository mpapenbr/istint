import { Reducer } from 'redux'
import { DriverState, DriverActionTypes } from './types'

const initialState: DriverState = {
    data: {name: "NoName", baseLaptime: 60.0, fuelPerLap: 3.0}
}

const reducer: Reducer<DriverState> = (state = initialState, action) => {
    switch(action.type) {
        // als Idee: hier könnte ein Saga zum Einsatz kommen: Parameter von Driver ändern sich und dann muss das Race neu berechnet werden.
        case DriverActionTypes.UPDATE_DEFAULT_DRIVER:
            return {...state, data: action.payload}
        default:
            return state;
    }
}

export {reducer as driverReducer, initialState as driverInitialState}