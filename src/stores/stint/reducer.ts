import { Reducer } from 'redux'
import { StintState, StintActionTypes, TimeBasedStintParam, Stint } from './types'

const initialState: StintState = {
    stint: {numLaps: 0, duration: 0, fuel: 0}
}

const reducer: Reducer<StintState> = (state = initialState, action) => {
    switch(action.type) {
        case StintActionTypes.COMPUTE_TIMEBASED: {
            // console.log(action.payload)
            
            const result = computeTimebased(action.payload)
            return {...state, ...result}
        }
        default:
            return state;
    }
}

const computeTimebased = (param : TimeBasedStintParam) : Stint => {
    const numLapsByTime = Math.floor(param.racetime / param.avgLaptime);
    const numLapsByTank = Math.floor(param.tank / param.fuelConsumption)
    const numLaps = Math.min(numLapsByTank, numLapsByTime)
    const duration = numLaps * param.avgLaptime
    const fuel = numLaps * param.fuelConsumption
    return {numLaps:numLaps,duration:duration, fuel:fuel}
}

export {reducer as stintReducer, initialState as stintInitialState}