import {action} from 'typesafe-actions'

import {RaceActionTypes, Race} from './types'
import { TimeBasedStintParam, Stint } from '../stint/types'



export const setDuration = (duration:number) => action(RaceActionTypes.SET_DURATION, duration)
export const setStints = (stints:Stint[]) => action(RaceActionTypes.SET_STINTS, stints)
export const computeRaceProposal = ( param:TimeBasedStintParam) => action(RaceActionTypes.COMPUTE_PROPOSAL, param)


