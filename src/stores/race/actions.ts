import {action} from 'typesafe-actions'

import {RaceActionTypes, Race} from './types'

export const setDuration = (duration:number) => action(RaceActionTypes.SET_DURATION, duration)

