import {action} from 'typesafe-actions'
import { IBaseAction } from '../../commons'
import { DriverActionTypes, IDriver } from './types'


export const updateDefaultDriver = (data:IDriver) : IBaseAction => action(DriverActionTypes.UPDATE_DEFAULT_DRIVER, data)
