import { all, call, fork, put, takeEvery, takeLatest, select } from "redux-saga/effects";
import { IBaseAction } from "../../commons";
import { RaceActionTypes, ITimedRace, IModifyStintParam } from "./types";
import { TimeBasedStintParam, Stint, TimeDriverBasedStintParam } from "../stint/types";
import { IDriver } from "../driver/types";
import { ApplicationState } from "..";
import _ from 'lodash';
import { defaultStint } from "../stint/reducer";

function* handleSagaTest(action:IBaseAction) : Generator {
    try {        
        const duration = action.payload; 
        yield put({type: RaceActionTypes.SET_DURATION, payload:duration})
    } catch (e) {
        console.log(e)
    }
}


const getRace = (state:ApplicationState)  : ITimedRace => state.race.data;

function* handleComputeProposal(action:IBaseAction) : Generator {
    try {        
        const driver : IDriver = action.payload; 
        // oh my! Typescript malus :( 
        // didn't yet find a way to get this assigned by using one statement 
        // see: https://github.com/redux-saga/redux-saga/issues/1976
        const raceDataTmp : unknown = yield select(getRace);
        const raceData: ITimedRace = raceDataTmp as ITimedRace;
        

        // console.log(driver);
        // console.log(raceData);
        const param : TimeDriverBasedStintParam = {
            car: raceData.car,
            driver: driver,
            racetime: raceData.duration*60,
        }
        yield put({type: RaceActionTypes.COMPUTE_PROPOSAL, payload:param})
    } catch (e) {
        console.log(e)
    }
}

/**
 * 
 * @param action 
 */
function* handleChangeSingleStint(action:IBaseAction) : Generator {
    try {        
        const raceDataTmp : unknown = yield select(getRace);
        const raceData: ITimedRace = raceDataTmp as ITimedRace;
        const param : IModifyStintParam = action.payload; 
        const newStints = _.clone(raceData.stints);
        const idx = _.findIndex(newStints, {no:param.no})
        newStints.splice(idx, 1, {...defaultStint, driver:param.driver, numLaps:param.numLaps, no:param.no})
        console.log(newStints);
        // Actions
        const pitTime = 0
        
        
        newStints.forEach((s,i) => {
            s.duration = s.numLaps * s.driver.baseLaptime;
            s.fuel = s.numLaps * s.driver.fuelPerLap;
            const startTime = i === 0 ? new Date("2015-03-25T12:00:00Z") : new Date(newStints[i-1].simTime.end.getTime() + pitTime);
            s.simTime = {
                start: startTime,
                end: new Date(startTime.getTime() + (s.duration * 1000))
            }
            console.log(s)
        })
        console.log(newStints)

        yield put({type: RaceActionTypes.SET_STINTS, payload:newStints})
    } catch (e) { 
        console.log(e)
    }
}

function* handleSagaTestDouble(action:IBaseAction) : Generator {
    try {        
        const duration = action.payload * 2; 
        yield put({type: RaceActionTypes.SET_DURATION, payload:duration})
        yield put({type: RaceActionTypes.SET_NAME, payload:"Doubled duration of " + duration})
    } catch (e) {
        console.log(e)
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
        yield takeLatest(RaceActionTypes.SAGA_COMPUTE_PROPOSAL, handleComputeProposal),
        yield takeLatest(RaceActionTypes.SAGA_CHANGE_SINGLE_STINT, handleChangeSingleStint),
        yield takeLatest(RaceActionTypes.SAGA_TEST_DOUBLE, handleSagaTestDouble),
        
    ]);
}