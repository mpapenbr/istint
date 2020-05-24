import {action} from 'typesafe-actions'

import {RaceActionTypes, IRace, IModifyStintParam} from './types'
import { TimeBasedStintParam, Stint, TimeDriverBasedStintParam } from '../stint/types'
import { IBaseAction } from '../../commons';
import { IDriver } from '../driver/types';



export const sagaTest = (duration:number) : IBaseAction => action(RaceActionTypes.SAGA_TEST, duration)
export const sagaTestDouble = (duration:number) : IBaseAction => action(RaceActionTypes.SAGA_TEST_DOUBLE, duration)
export const sagaComputeRaceProposal = ( param:IDriver) => action(RaceActionTypes.SAGA_COMPUTE_PROPOSAL, param)
export const sagaChangeSingleStint = ( param:IModifyStintParam) => action(RaceActionTypes.SAGA_CHANGE_SINGLE_STINT, param)

export const setDuration = (duration:number) : IBaseAction => action(RaceActionTypes.SET_DURATION, duration)
export const setName = (name:string) : IBaseAction => action(RaceActionTypes.SET_NAME, name)
export const setStints = (stints:Stint[]) => action(RaceActionTypes.SET_STINTS, stints)
export const computeRaceProposalTry = ( param:TimeBasedStintParam) => action(RaceActionTypes.COMPUTE_PROPOSAL_TRY, param)
export const computeRaceProposal = ( param:TimeDriverBasedStintParam) => action(RaceActionTypes.COMPUTE_PROPOSAL, param)


