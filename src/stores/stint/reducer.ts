import { Reducer } from 'redux'
import { StintState, StintActionTypes, TimeBasedStintParam, Stint } from './types'
import {driverInitialState} from '../driver/reducer'

const initialState: StintState = {
    stint: {numLaps: 0, duration: 0, fuel: 0, 
        driver: driverInitialState.driver, 
        realTime: {start:0, end:0}, 
        simTime: {start:0,end:0}}
}

const reducer: Reducer<StintState> = (state = initialState, action) => {
    switch(action.type) {
        default:
            return state;
    }
}



export {reducer as stintReducer, initialState as stintInitialState}