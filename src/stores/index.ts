import {all, fork} from 'redux-saga/effects'
import { IRaceState } from './race/types'
import { History } from 'history'
import { combineReducers } from 'redux'
import { RouterState, connectRouter } from 'connected-react-router'
import { raceReducer } from './race/reducer'
import { TypeConstant,  PayloadMetaAction } from 'typesafe-actions'
import raceSaga from './race/sagas'

export interface ApplicationState {
    race: IRaceState,
    router: RouterState
}

// export interface IMetaActions extends PayloadMetaAction<TypeConstant,IMeta> {}

export const createRootReducer = (history: History) => 
    combineReducers({
        race: raceReducer,
        router: connectRouter(history)
    })

export function* rootSaga() {
    yield all([fork(raceSaga)])
}