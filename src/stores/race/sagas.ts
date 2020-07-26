import _ from "lodash";
import { all, fork, put, select, takeEvery, takeLatest } from "redux-saga/effects";
import { ApplicationState } from "..";
import { IBaseAction } from "../../commons";
import { CarState, TireChangeMode } from "../car/types";
import { DriverState } from "../driver/types";
import { ISettings, ISettingsState } from "../settings/types";
import { Stint } from "../stint/types";
import { TrackState } from "../track/types";
import { recomputeRaceStints } from "./compute";
import { computeFreshRace } from "./proposals";
import {
  handleChangeDuration,
  handleChangeRaceRealStartTime as handleChangeStartReal,
  handleChangeRaceSimStartTime as handleChangeStartSim,
} from "./sagas/settings";
import { handleChangeStintDriver, handleMoveStint } from "./sagas/stintorder";
import {
  IChangeSingleStintParam,
  IModifyStintParam,
  ISimpleRaceProposalParam,
  ITimedRace,
  RaceActionTypes,
} from "./types";

export function* handleSagaTest(action: IBaseAction): Generator {
  try {
    // console.log("i am here with payload ", action.payload)
    const duration = action.payload;
    yield put({ type: RaceActionTypes.SET_DURATION, payload: duration });
  } catch (e) {
    console.log(e);
  }
}

const getRace = (state: ApplicationState): ITimedRace => state.race.data;
const getSettings = (state: ApplicationState): ISettings => state.settings.data;

function* handleChangeCar(
  action: IBaseAction
): //: Generator<StrictEffect,void, Stint[]>
Generator {
  try {
    const carId: number = action.payload;
    // oh my! Typescript malus :(
    // didn't yet find a way to get this assigned by using one statement
    // see: https://github.com/redux-saga/redux-saga/issues/1976
    const raceDataTmp: unknown = yield select(getRace);
    const raceData: ITimedRace = raceDataTmp as ITimedRace;
    const carState = (yield select((state: ApplicationState) => state.cars)) as CarState;
    const driverState = (yield select((state: ApplicationState) => state.driver)) as DriverState;
    const settings = (yield select((state: ApplicationState) => state.settings)) as ISettingsState;

    const newCar = carState.allCars.find((v) => v.id === carId);
    if (newCar !== undefined) {
      yield put({ type: RaceActionTypes.SET_CAR, payload: newCar });
      let workStints = computeFreshRace({ ...raceData, car: newCar }, driverState.allDrivers, settings.data.strategy);
      const stints = recomputeRaceStints({ ...raceData, stints: workStints });
      yield put({ type: RaceActionTypes.SET_STINTS, payload: stints });
    }
  } catch (e) {
    console.log(e);
  }
}

function* handleChangeTrack(
  action: IBaseAction
): //: Generator<StrictEffect,void, Stint[]>
Generator {
  try {
    const trackId: number = action.payload;
    const raceData: ITimedRace = (yield select(getRace)) as ITimedRace;
    const trackState = (yield select((state: ApplicationState) => state.tracks)) as TrackState;
    const driverState = (yield select((state: ApplicationState) => state.driver)) as DriverState;
    const settings = (yield select((state: ApplicationState) => state.settings)) as ISettingsState;
    const newTrack = trackState.allTracks.find((v) => v.id === trackId);
    if (newTrack !== undefined) {
      yield put({ type: RaceActionTypes.SET_TRACK, payload: newTrack });

      let workStints = computeFreshRace(
        { ...raceData, track: newTrack },
        driverState.allDrivers,
        settings.data.strategy
      );
      const stints = recomputeRaceStints({ ...raceData, stints: workStints });
      yield put({ type: RaceActionTypes.SET_STINTS, payload: stints });
    }
  } catch (e) {
    console.log(e);
  }
}

export function* handleQuickComputeProposal(
  action: IBaseAction
): //: Generator<StrictEffect,void, Stint[]>
Generator {
  try {
    const myParam: ISimpleRaceProposalParam = action.payload;
    yield put({ type: RaceActionTypes.SET_NAME, payload: myParam.name });
    yield put({
      type: RaceActionTypes.SET_DURATION,
      payload: myParam.duration,
    });
    // yield put({
    //   type: DriverActionTypes.UPDATE_DEFAULT_DRIVER,
    //   payload: myParam.driver,
    // });

    // oh my! Typescript malus :(
    // didn't yet find a way to get this assigned by using one statement
    // see: https://github.com/redux-saga/redux-saga/issues/1976
    const raceDataTmp: unknown = yield select(getRace);
    const raceData: ITimedRace = raceDataTmp as ITimedRace;

    // console.log(driver);
    // console.log(raceData);

    const stints = computeFreshRace({ ...raceData, duration: myParam.duration }, myParam.driver, myParam.strategy);
    const workRace = { ...raceData, stints: stints };
    yield put({
      type: RaceActionTypes.SET_STINTS,
      payload: recomputeRaceStints(workRace),
    });
  } catch (e) {
    console.log(e);
  }
}

function computeRace(race: ITimedRace, stints: Stint[]): Stint[] {
  console.log("computeRace", { race }, "stints:", { stints });
  const newStints = Array.from(stints);
  newStints.forEach((s, i) => {
    s.duration = s.numLaps * s.driver.baseLaptime;
    s.fuel = s.numLaps * s.driver.fuelPerLap;

    const startTime =
      i === 0
        ? new Date("2015-03-25T12:00:00Z")
        : new Date(newStints[i - 1].simTime.end.getTime() + newStints[i - 1].pitTime.total * 1000);

    let work =
      i < stints.length - 1
        ? {
            pitDelta: race.track.pitDelta,
            changeTires: s.wantNewTires ? race.car.tireChangeTime : 0,
            refill: (newStints[i + 1].numLaps * s.driver.fuelPerLap) / race.car.refillRate,
            driverChange: newStints[i + 1].driver.name === s.driver.name ? 0 : 30,
            total: 0,
          }
        : {
            pitDelta: 0,
            changeTires: 0,
            refill: 0,
            driverChange: 0,
            total: 0,
          };
    const pitWorkTime = () => {
      switch (race.car.tireChangeMode) {
        case TireChangeMode.DURING_REFILL:
          return Math.max(work.driverChange, Math.min(work.changeTires, work.refill));
        case TireChangeMode.AFTER_REFILL:
          return Math.max(work.driverChange, work.changeTires + work.refill);
      }
    };

    work.total = work.pitDelta + pitWorkTime();
    s.pitTime = work;

    s.simTime = {
      start: startTime,
      end: new Date(startTime.getTime() + s.duration * 1000),
    };
    // console.log(s)
  });
  return newStints;
}

/**
 *
 * @param action
 */
function* handleChangeSingleStint(action: IBaseAction): Generator {
  try {
    const raceData: ITimedRace = (yield select(getRace)) as ITimedRace;
    const param: IModifyStintParam = action.payload;
    let newStints = _.clone(raceData.stints);
    const idx = _.findIndex(newStints, { no: param.no });
    newStints.splice(idx, 1, {
      ...newStints[idx],
      driver: param.driver,
      numLaps: param.numLaps,
      no: param.no,
    });
    console.log(newStints);
    // Actions
    const pitTime = 0;

    newStints = computeRace(raceData, newStints);

    yield put({ type: RaceActionTypes.SET_STINTS, payload: newStints });
  } catch (e) {
    console.log(e);
  }
}

/**
 *
 * @param action
 */
function* handleChangeSingleStintAttributeNumLaps(action: IBaseAction): Generator {
  try {
    const raceData: ITimedRace = (yield select(getRace)) as ITimedRace;
    const settings: ISettings = (yield select(getSettings)) as ISettings;

    const param: IChangeSingleStintParam = action.payload;
    let newStints = _.clone(raceData.stints);
    const idx = _.findIndex(newStints, { no: param.no });
    const oldStintData = raceData.stints[idx];
    newStints.splice(idx, 1, {
      ...newStints[idx],
      numLaps: param.value as number,
    });

    // ohne AutoRepair wird einfach neu durchgerechnet und fertig.
    // Stints werden mit Problemen markiert, falls welche auftreten.
    if (settings.autoRepair) {
      console.log("TODO: process ", { param });
      // TODO
      yield put({ type: RaceActionTypes.SET_STINTS, payload: newStints });
    } else {
      const workRace = { ...raceData, stints: newStints };
      yield put({
        type: RaceActionTypes.SET_STINTS,
        payload: recomputeRaceStints(workRace),
      });
    }
  } catch (e) {
    console.log(e);
  }
}

/**
 *
 * @param action
 */
function* handleChangeSingleStintAttributeLaptime(action: IBaseAction): Generator {
  try {
    const raceData: ITimedRace = (yield select(getRace)) as ITimedRace;
    const settings: ISettings = (yield select(getSettings)) as ISettings;

    const param: IChangeSingleStintParam = action.payload;
    let newStints = _.clone(raceData.stints);
    const idx = _.findIndex(newStints, { no: param.no });
    const oldStintData = raceData.stints[idx];
    newStints.splice(idx, 1, {
      ...newStints[idx],
      driver: { ...newStints[idx].driver, baseLaptime: param.value as number },
    });

    // ohne AutoRepair wird einfach neu durchgerechnet und fertig.
    // Stints werden mit Problemen markiert, falls welche auftreten.
    if (settings.autoRepair) {
      console.log("TODO: process ", { param });
      // TODO
      yield put({ type: RaceActionTypes.SET_STINTS, payload: newStints });
    } else {
      const workRace = { ...raceData, stints: newStints };
      yield put({
        type: RaceActionTypes.SET_STINTS,
        payload: recomputeRaceStints(workRace),
      });
    }
  } catch (e) {
    console.log(e);
  }
}
/**
 *
 * @param action
 */
function* handleChangeSingleStintAttributeFuelPerLap(action: IBaseAction): Generator {
  try {
    const raceData: ITimedRace = (yield select(getRace)) as ITimedRace;
    const settings: ISettings = (yield select(getSettings)) as ISettings;

    const param: IChangeSingleStintParam = action.payload;
    let newStints = _.clone(raceData.stints);
    const idx = _.findIndex(newStints, { no: param.no });
    const oldStintData = raceData.stints[idx];
    newStints.splice(idx, 1, {
      ...newStints[idx],
      driver: { ...newStints[idx].driver, fuelPerLap: param.value as number },
    });

    // ohne AutoRepair wird einfach neu durchgerechnet und fertig.
    // Stints werden mit Problemen markiert, falls welche auftreten.
    if (settings.autoRepair) {
      console.log("TODO: process ", { param });
      // TODO
      yield put({ type: RaceActionTypes.SET_STINTS, payload: newStints });
    } else {
      const workRace = { ...raceData, stints: newStints };
      yield put({
        type: RaceActionTypes.SET_STINTS,
        payload: recomputeRaceStints(workRace),
      });
    }
  } catch (e) {
    console.log(e);
  }
}
/**
 *
 * @param action
 */
function* handleChangeSingleStintAttributeTires(action: IBaseAction): Generator {
  try {
    const raceData: ITimedRace = (yield select(getRace)) as ITimedRace;
    const settings: ISettings = (yield select(getSettings)) as ISettings;

    const param: IChangeSingleStintParam = action.payload;
    let newStints = _.clone(raceData.stints);
    const idx = _.findIndex(newStints, { no: param.no });
    const oldStintData = raceData.stints[idx];
    newStints.splice(idx, 1, {
      ...newStints[idx],
      wantNewTires: param.value as boolean,
    });

    // ohne AutoRepair wird einfach neu durchgerechnet und fertig.
    // Stints werden mit Problemen markiert, falls welche auftreten.
    if (settings.autoRepair) {
      console.log("TODO: process ", { param });
      // TODO
      yield put({ type: RaceActionTypes.SET_STINTS, payload: newStints });
    } else {
      const workRace = { ...raceData, stints: newStints };
      yield put({
        type: RaceActionTypes.SET_STINTS,
        payload: recomputeRaceStints(workRace),
      });
    }
  } catch (e) {
    console.log(e);
  }
}

function* handleSagaTestDouble(action: IBaseAction): Generator {
  try {
    const duration = action.payload * 2;
    yield put({ type: RaceActionTypes.SET_DURATION, payload: duration });
    yield put({
      type: RaceActionTypes.SET_NAME,
      payload: "Doubled duration of " + duration,
    });
  } catch (e) {
    console.log(e);
  }
}

function* watchSagaTestRequest(): Generator {
  yield takeEvery(RaceActionTypes.SAGA_TEST, handleSagaTest);
}

export default function* raceSaga() {
  // does NOT work: yield all([watchSagaTestRequest]);
  // does work: yield all([fork(watchSagaTestRequest)]);
  // does work: yield all([watchSagaTestRequest()]);

  yield all([
    fork(watchSagaTestRequest),

    yield takeLatest(RaceActionTypes.SAGA_CHANGE_SINGLE_STINT, handleChangeSingleStint),
    yield takeLatest(RaceActionTypes.SAGA_CHANGE_STINT_DRIVER, handleChangeStintDriver),
    yield takeLatest(RaceActionTypes.SAGA_CHANGE_STINT_ATTRIBUTE_NUMLAPS, handleChangeSingleStintAttributeNumLaps),
    yield takeLatest(RaceActionTypes.SAGA_CHANGE_STINT_ATTRIBUTE_LAPTIME, handleChangeSingleStintAttributeLaptime),
    yield takeLatest(
      RaceActionTypes.SAGA_CHANGE_STINT_ATTRIBUTE_FUELPERLAP,
      handleChangeSingleStintAttributeFuelPerLap
    ),
    yield takeLatest(RaceActionTypes.SAGA_CHANGE_STINT_ATTRIBUTE_TIRES, handleChangeSingleStintAttributeTires),
    yield takeLatest(RaceActionTypes.SAGA_TEST_DOUBLE, handleSagaTestDouble),
    yield takeLatest(RaceActionTypes.SAGA_QUICK_PROPOSAL, handleQuickComputeProposal),
    yield takeLatest(RaceActionTypes.SAGA_CHANGE_CAR, handleChangeCar),
    yield takeLatest(RaceActionTypes.SAGA_CHANGE_TRACK, handleChangeTrack),
    yield takeLatest(RaceActionTypes.SAGA_CHANGE_DURATION, handleChangeDuration),
    yield takeLatest(RaceActionTypes.SAGA_CHANGE_START_REAL, handleChangeStartReal),
    yield takeLatest(RaceActionTypes.SAGA_CHANGE_START_SIM, handleChangeStartSim),
    yield takeLatest(RaceActionTypes.SAGA_MOVE_STINT, handleMoveStint),
  ]);
}
