import {action} from 'typesafe-actions'

import {RaceActionTypes, IRace} from './types'
import { TimeBasedStintParam, Stint } from '../stint/types'
import { IBaseAction } from '../../commons';



export const sagaTest = (duration:number) : IBaseAction => action(RaceActionTypes.SAGA_TEST, duration)
export const sagaTestDouble = (duration:number) : IBaseAction => action(RaceActionTypes.SAGA_TEST_DOUBLE, duration)

export const setDuration = (duration:number) : IBaseAction => action(RaceActionTypes.SET_DURATION, duration)
export const setName = (name:string) : IBaseAction => action(RaceActionTypes.SET_NAME, name)
export const setStints = (stints:Stint[]) => action(RaceActionTypes.SET_STINTS, stints)
export const computeRaceProposal = ( param:TimeBasedStintParam) => action(RaceActionTypes.COMPUTE_PROPOSAL, param)


