import {action} from 'typesafe-actions'

import {StintActionTypes, Stint, StintParam, TimeBasedStintParam} from './types'

export const compute = (param:TimeBasedStintParam) => action(StintActionTypes.COMPUTE_TIMEBASED, param)
export const computeRaceProposal = ( param:TimeBasedStintParam) => action(StintActionTypes.COMPUTE_RACE_PROPOSAL, param)

