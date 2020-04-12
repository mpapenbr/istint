import { Reducer } from 'redux'
import { RaceState, RaceActionTypes } from './types'

const initialState: RaceState = {
    data: {name: 'Unnamed race', duration: 0}
}

const reducer: Reducer<RaceState> = (state = initialState, action) => {
    switch(action.type) {
        case RaceActionTypes.SET_DURATION: {
            return {...state, duration: action.payload}
        }
        default:
            return state;
    }
}

export {reducer as raceReducer, initialState as raceInitialState}