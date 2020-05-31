import {action} from 'typesafe-actions'
import { IBaseAction } from '../../commons'
import { SettingsActionTypes } from './types'
import { RaceStrategyMode } from '../stint/types'


export const updateAutoRepair = (data: boolean) : IBaseAction => action(SettingsActionTypes.UPDATE_AUTO_REPAIR, data)
export const updateStrategy = (data: RaceStrategyMode) : IBaseAction => action(SettingsActionTypes.UPDATE_STRATEGY, data)
