import { Reducer } from 'redux'
import { DriverState } from './types'

const initialState: DriverState = {
    driver: {name: "NoName", baseLaptime: 60000, fuelPerLap: 3.0}
}

const reducer: Reducer<DriverState> = (state = initialState, action) => {
    switch(action.type) {
        // als Idee: hier könnte ein Saga zum Einsatz kommen: Parameter von Driver ändern sich und dann muss das Race neu berechnet werden.
        default:
            return state;
    }
}

export {reducer as driverReducer, initialState as driverInitialState}