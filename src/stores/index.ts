import {all, fork} from 'redux-saga/effects'
import { IRaceState } from './race/types'
import { History } from 'history'
import { combineReducers } from 'redux'
import { RouterState, connectRouter } from 'connected-react-router'
import { raceReducer } from './race/reducer'
import { TypeConstant,  PayloadMetaAction } from 'typesafe-actions'
import raceSaga from './race/sagas'
import { IDriver, DriverState } from './driver/types'
import { driverReducer } from './driver/reducer'
import { carReducer } from './car/reducer'
import { CarState } from './car/types'
import { settingsReducer } from './settings/reducer'
import { ISettingsState } from './settings/types'
import { TrackState } from './track/types'
import { trackReducer } from './track/reducer'

export interface ApplicationState {
    race: IRaceState,
    driver: DriverState,
    cars: CarState,
    tracks: TrackState,
    settings: ISettingsState,
    router: RouterState
}

// export interface IMetaActions extends PayloadMetaAction<TypeConstant,IMeta> {}

export const createRootReducer = (history: History) => 
    combineReducers({
        race: raceReducer,
        driver: driverReducer,
        cars: carReducer,
        tracks: trackReducer,
        settings: settingsReducer,
        router: connectRouter(history)
    })

export function* rootSaga() {
    yield all([fork(raceSaga)])
}