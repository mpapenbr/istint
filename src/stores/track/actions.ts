import {action} from 'typesafe-actions'
import { IBaseAction } from '../../commons'
import { TrackActionTypes, ITrack } from './types'


export const updateDefaultTrack = (data:ITrack) : IBaseAction => action(TrackActionTypes.UPDATE_DEFAULT_TRACK, data)