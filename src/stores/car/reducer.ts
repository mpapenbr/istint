import { Reducer } from 'redux'
import { CarState, CarActionTypes, defaultCar } from './types'

const initialState: CarState = {
    data: defaultCar
}

const reducer: Reducer<CarState> = (state = initialState, action) => {
    switch(action.type) {
        // als Idee: hier könnte ein Saga zum Einsatz kommen: Parameter von Driver ändern sich und dann muss das Race neu berechnet werden.
        case CarActionTypes.UPDATE_DEFAULT_CAR:
            const ret =  {...state, data: action.payload}
            //console.log({...ret})
            return ret
        default:
            return state;
    }
}

export {reducer as carReducer, initialState as carInitialState}