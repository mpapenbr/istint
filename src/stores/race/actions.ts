import {action} from 'typesafe-actions'

import {RaceActionTypes, IRace, IModifyStintParam, ISimpleRaceProposalParam} from './types'
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

export const setDings = (param: ISimpleRaceProposalParam) : IBaseAction => action(RaceActionTypes.SAGA_QUICK_PROPOSAL, param )
