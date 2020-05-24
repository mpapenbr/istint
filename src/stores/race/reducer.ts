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
        case RaceActionTypes.COMPUTE_PROPOSAL: {            
            return {...state, data:{...state.data, stints:computeProposal(action.payload)}}
        }
        case RaceActionTypes.COMPUTE_PROPOSAL_TRY: {            
            return {...state, data:{...state.data, stints:computeProposalTry(action.payload)}}
        }
        case RaceActionTypes.SET_STINTS: {
            return {...state, data:{...state.data, stints:action.payload}}
        }
        default:
            return state;
    }
}

const computeProposal = (param :TimeDriverBasedStintParam) : Stint[] => {
    let stintNo = 1;
    const stint = computeTimebased(param) // now we know how much is possible per tank
    stint.no = stintNo;
    console.log("computeProposal with ",{...param}, " results in ",{...stint})
    const stintBreak = 5
    let remainingTime = param.racetime - stint.duration
    let ret = [];
    ret.push(stint);
    
    
    while (remainingTime > 0) {        
       const next =  computeTimebased({...param, racetime:remainingTime})
       next.no = ++stintNo;
       // console.log(next)
       ret.push(next)
       remainingTime -= next.duration + stintBreak;
       // console.log("remainingTime:", remainingTime)
    }
    return ret;
}



/**
 * This method is just for development. Implementation may vary ;)
 * @param param "simple" parameter. Just used for some evaluation
 */
const computeProposalTry = (param :TimeBasedStintParam) : Stint[] => {
    const stint = computeTimebasedSimple(param) // now we know how much is possible per tank
    //console.log("computeProposal with ",{...param}, " results in ",{...stint})
    const stintBreak = 5
    let remainingTime = param.racetime - stint.duration
    let ret = [];
    ret.push(stint);
    
    
    while (remainingTime > 0) {
       const next =  computeTimebasedSimple({...param, racetime:remainingTime})
       // console.log(next)
       ret.push(next)
       remainingTime -= next.duration + stintBreak;
       // console.log("remainingTime:", remainingTime)
    }
    return ret;
}

const computeTimebased = (param : TimeDriverBasedStintParam) : Stint => {
    const numLapsByTime = Math.max(1,Math.ceil(param.racetime / param.driver.baseLaptime))
    const numLapsByTank = Math.floor(param.car.tank / param.driver.fuelPerLap)
    const numLaps = Math.min(numLapsByTank, numLapsByTime)
    const duration = numLaps * param.driver.baseLaptime
    const fuel = numLaps * param.driver.fuelPerLap
    return {...stintInitialState.stint, driver: _.clone(param.driver), numLaps:numLaps,duration:duration, fuel:fuel}
}


const computeTimebasedSimple = (param : TimeBasedStintParam) : Stint => {
    const numLapsByTime = Math.max(1,Math.ceil(param.racetime / param.avgLaptime))
    const numLapsByTank = Math.floor(param.tank / param.fuelConsumption)
    const numLaps = Math.min(numLapsByTank, numLapsByTime)
    const duration = numLaps * param.avgLaptime
    const fuel = numLaps * param.fuelConsumption
    return {...stintInitialState.stint, numLaps:numLaps,duration:duration, fuel:fuel}
}

export {reducer as raceReducer, initialState as raceInitialState}