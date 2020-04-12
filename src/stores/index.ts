import {all} from 'redux-saga/effects'
import { RaceState } from './race/types'
import { History } from 'history'
import { combineReducers } from 'redux'
import { RouterState, connectRouter } from 'connected-react-router'
import { raceReducer } from './race/reducer'

export interface ApplicationState {
    race: RaceState,
    router: RouterState
}

export const createRootReducer = (history: History) => 
    combineReducers({
        race: raceReducer,
        router: connectRouter(history)
    })

export function* rootSaga() {
    yield all([])
}