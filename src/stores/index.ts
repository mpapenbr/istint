import { connectRouter, RouterState } from "connected-react-router";
import { History } from "history";
import { combineReducers } from "redux";
import { all, fork } from "redux-saga/effects";
import { carReducer } from "./car/reducer";
import { CarState } from "./car/types";
import { driverReducer } from "./driver/reducer";
import { DriverState } from "./driver/types";
import { raceReducer } from "./race/reducer";
import raceSaga from "./race/sagas";
import { IRaceState } from "./race/types";
import { settingsReducer } from "./settings/reducer";
import { ISettingsState } from "./settings/types";
import { trackReducer } from "./track/reducer";
import { TrackState } from "./track/types";
import { uiReducer } from "./ui/reducer";
import { IUiState } from "./ui/types";

export interface ApplicationState {
  race: IRaceState;
  driver: DriverState;
  cars: CarState;
  tracks: TrackState;
  settings: ISettingsState;
  ui: IUiState;
  router: RouterState;
}

// export interface IMetaActions extends PayloadMetaAction<TypeConstant,IMeta> {}

export const createRootReducer = (history: History) =>
  combineReducers({
    race: raceReducer,
    driver: driverReducer,
    cars: carReducer,
    tracks: trackReducer,
    settings: settingsReducer,
    ui: uiReducer,
    router: connectRouter(history),
  });

export function* rootSaga() {
  yield all([fork(raceSaga)]);
}
