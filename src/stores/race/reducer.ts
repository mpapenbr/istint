import { Reducer } from 'redux'
import { IRaceState, RaceActionTypes } from './types'
import { StintParam, Stint, TimeBasedStintParam } from '../stint/types'
import { stintInitialState } from '../stint/reducer'

const initialState: IRaceState = {
    data: {name: 'Unnamed race', duration: 0, stints:[]}
}

const reducer: Reducer<IRaceState> = (state = initialState, action) => {
    switch(action.type) {
        case RaceActionTypes.SET_DURATION: {
            console.log("dings" + action)
            console.log("Even more logs:", {action})
            return {...state, data:{...state.data, duration: action.payload}}
        }

        case RaceActionTypes.SET_NAME: {
            
            return {...state, data:{...state.data, name: action.payload}}
        }
        case RaceActionTypes.COMPUTE_PROPOSAL: {
            return {...state, data:{...state.data, stints:computeProposal(action.payload)}}
        }
        case RaceActionTypes.SET_STINTS: {
            return {...state, data:{...state.data, stints:action.payload}}
        }
        default:
            return state;
    }
}

const computeProposal = (param :TimeBasedStintParam) : Stint[] => {
    const stint = computeTimebased(param) // now we know how much is possible per tank
    const stintBreak = 5
    let remainingTime = param.racetime - stint.duration
    let ret = [];
    ret.push(stint);
    
    
    while (remainingTime > 0) {
       const next =  computeTimebased({...param, racetime:remainingTime})
       // console.log(next)
       ret.push(next)
       remainingTime -= next.duration + stintBreak;
       // console.log("remainingTime:", remainingTime)
    }
    return ret;
}

const computeTimebased = (param : TimeBasedStintParam) : Stint => {
    const numLapsByTime = Math.max(1,Math.floor(param.racetime / param.avgLaptime))
    const numLapsByTank = Math.floor(param.tank / param.fuelConsumption)
    const numLaps = Math.min(numLapsByTank, numLapsByTime)
    const duration = numLaps * param.avgLaptime
    const fuel = numLaps * param.fuelConsumption
    return {...stintInitialState.stint, numLaps:numLaps,duration:duration, fuel:fuel}
}

export {reducer as raceReducer, initialState as raceInitialState}