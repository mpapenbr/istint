import {action} from 'typesafe-actions'

import {RaceActionTypes, IRace, IModifyStintParam, ISimpleRaceProposalParam} from './types'
import { TimeBasedStintParam, Stint, TimeDriverBasedStintParam } from '../stint/types'
import { IBaseAction } from '../../commons';
import { IDriver } from '../driver/types';
import { ITrack } from '../track/types';
import { ICar } from '../car/types';



export const sagaTest = (duration:number) : IBaseAction => action(RaceActionTypes.SAGA_TEST, duration)
export const sagaTestDouble = (duration:number) : IBaseAction => action(RaceActionTypes.SAGA_TEST_DOUBLE, duration)

export const sagaChangeSingleStint = ( param:IModifyStintParam) => action(RaceActionTypes.SAGA_CHANGE_SINGLE_STINT, param)
export const sagaChangeCar = ( carId: number) => action(RaceActionTypes.SAGA_CHANGE_CAR, carId)
export const sagaChangeTrack = ( trackId: number) => action(RaceActionTypes.SAGA_CHANGE_TRACK, trackId)

export const setDuration = (duration:number) : IBaseAction => action(RaceActionTypes.SET_DURATION, duration)
export const setName = (name:string) : IBaseAction => action(RaceActionTypes.SET_NAME, name)
export const setTrack = (track:ITrack) : IBaseAction => action(RaceActionTypes.SET_TRACK, track)
export const setCar = (car:ICar) : IBaseAction => action(RaceActionTypes.SET_CAR, car)

export const setStints = (stints:Stint[]) => action(RaceActionTypes.SET_STINTS, stints)

export const setDings = (param: ISimpleRaceProposalParam) : IBaseAction => action(RaceActionTypes.SAGA_QUICK_PROPOSAL, param )
