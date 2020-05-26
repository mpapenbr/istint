import { Reducer } from 'redux'
import { IRaceState, RaceActionTypes, defaultTimedRace } from './types'
import { StintParam, Stint, TimeBasedStintParam, TimeDriverBasedStintParam } from '../stint/types'
import { stintInitialState } from '../stint/reducer'
import _ from 'lodash'

const initialState: IRaceState = {
    data: defaultTimedRace
}

const reducer: Reducer<IRaceState> = (state = initialState, action) => {
    switch(action.type) {
        case RaceActionTypes.SET_DURATION: {            
            return {...state, data:{...state.data, duration: action.payload}}
        }

        case RaceActionTypes.SET_NAME: {
            
            return {...state, data:{...state.data, name: action.payload}}
        }
        case RaceActionTypes.SET_STINTS: {
            return {...state, data:{...state.data, stints:action.payload}}
        }
        default:
            return state;
    }
}






export {reducer as raceReducer, initialState as raceInitialState}