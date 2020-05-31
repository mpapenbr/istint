import { all, call, fork, put,  takeEvery, takeLatest, select, StrictEffect } from "redux-saga/effects";
import { IBaseAction } from "../../commons";
import { RaceActionTypes, ITimedRace, IModifyStintParam, ISimpleRaceProposalParam } from "./types";
import { TimeBasedStintParam, Stint, TimeDriverBasedStintParam } from "../stint/types";
import { TireChangeMode, CarState, ICar } from '../car/types';
import { IDriver, DriverActionTypes, defaultDriver, DriverState } from "../driver/types";
import { ApplicationState } from "..";
import _ from 'lodash';
import { useSelector } from "react-redux";
import { computeTimebased } from "./common";
import { computeFreshRace } from "./proposals";
import { TrackState } from "../track/types";

function* handleSagaTest(action:IBaseAction) : Generator {
    try {        
        const duration = action.payload; 
        yield put({type: RaceActionTypes.SET_DURATION, payload:duration})
    } catch (e) {
        console.log(e)
    }
}


const getRace = (state:ApplicationState)  : ITimedRace => state.race.data;


function* handleChangeCar(action:IBaseAction) 
//: Generator<StrictEffect,void, Stint[]> 
: Generator
{
    try {        
        const carId : number = action.payload; 
        // oh my! Typescript malus :( 
        // didn't yet find a way to get this assigned by using one statement 
        // see: https://github.com/redux-saga/redux-saga/issues/1976
        const raceDataTmp : unknown = yield select(getRace);
        const raceData: ITimedRace = raceDataTmp as ITimedRace;
        const carState = (yield select((state : ApplicationState) => state.cars)) as CarState;
        const driverState = (yield select((state : ApplicationState) => state.driver)) as DriverState;
        const newCar  = carState.allCars.find(v => v.id === carId);
        if (newCar !== undefined) {
            yield put({type: RaceActionTypes.SET_CAR, payload:newCar})
            
            const stints = computeFreshRace({...raceData, car: newCar}, driverState.currentDriver);
            yield put({type: RaceActionTypes.SET_STINTS, payload:stints})
        }

    
    } catch (e) {
        console.log(e)
    }
}

function* handleChangeTrack(action:IBaseAction) 
//: Generator<StrictEffect,void, Stint[]> 
: Generator
{
    try {        
        const trackId : number = action.payload; 
        const raceData: ITimedRace = (yield select(getRace)) as ITimedRace;
        const trackState = (yield select((state : ApplicationState) => state.tracks)) as TrackState;
        const driverState = (yield select((state : ApplicationState) => state.driver)) as DriverState;
        const newTrack  = trackState.allTracks.find(v => v.id === trackId);
        if (newTrack !== undefined) {
            yield put({type: RaceActionTypes.SET_TRACK, payload:newTrack})
            
            const stints = computeFreshRace({...raceData, track: newTrack}, driverState.currentDriver);
            yield put({type: RaceActionTypes.SET_STINTS, payload:stints})
        }

    
    } catch (e) {
        console.log(e)
    }
}

function* handleQuickComputeProposal(action:IBaseAction) 
//: Generator<StrictEffect,void, Stint[]> 
: Generator
{
    try {        
        const myParam : ISimpleRaceProposalParam = action.payload;
        yield put({type: RaceActionTypes.SET_NAME, payload:myParam.name})
        yield put({type: RaceActionTypes.SET_DURATION, payload:myParam.duration})
        yield put({type: DriverActionTypes.UPDATE_DEFAULT_DRIVER, payload:myParam.driver})
        
        
        // oh my! Typescript malus :( 
        // didn't yet find a way to get this assigned by using one statement 
        // see: https://github.com/redux-saga/redux-saga/issues/1976
        const raceDataTmp : unknown = yield select(getRace);
        const raceData: ITimedRace = raceDataTmp as ITimedRace;
        

        // console.log(driver);
        console.log(raceData);
        
        const stints = computeFreshRace({...raceData, duration:myParam.duration}, myParam.driver, myParam.strategy)
        yield put({type: RaceActionTypes.SET_STINTS, payload:stints})
    } catch (e) {
        console.log(e)
    }
}


function computeRace(race : ITimedRace, stints : Stint[]) : Stint[] {
    console.log("computeRace", {race}, "stints:", {stints})
    const newStints = Array.from(stints);
    newStints.forEach((s,i) => {
        s.duration = s.numLaps * s.driver.baseLaptime;
        s.fuel = s.numLaps * s.driver.fuelPerLap;

        const startTime = i === 0 ? new Date("2015-03-25T12:00:00Z") : new Date(newStints[i-1].simTime.end.getTime() + (newStints[i-1].pitTime.total*1000));
        
        let work = i < (stints.length-1) ? {
            pitDelta: race.track.pitDelta,
            changeTires: s.wantNewTires ? race.car.tireChangeTime : 0, 
            refill: (( newStints[i+1].numLaps * s.driver.fuelPerLap) / race.car.refillRate ),
            driverChange: (newStints[i+1].driver.name === s.driver.name ? 0 : 30),
            total: 0,
        } : {
            pitDelta : 0,
            changeTires: 0,
            refill: 0,
            driverChange: 0,
            total: 0,

        }
        const pitWorkTime = () => {
            switch(race.car.tireChangeMode) {
            case TireChangeMode.DURING_REFILL:
                return Math.max(work.driverChange, Math.min(work.changeTires, work.refill));
            case TireChangeMode.AFTER_REFILL:
                return Math.max(work.driverChange, work.changeTires + work.refill);
        }};
        
        work.total = work.pitDelta + pitWorkTime();
        s.pitTime = work;
        
        s.simTime = {
            start: startTime,
            end: new Date(startTime.getTime() + (s.duration * 1000))
        }
        // console.log(s)
    })
    return newStints;
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
        let newStints = _.clone(raceData.stints);
        const idx = _.findIndex(newStints, {no:param.no})
        newStints.splice(idx, 1, {...newStints[idx], driver:param.driver, numLaps:param.numLaps, no:param.no})
        console.log(newStints);
        // Actions
        const pitTime = 0
        
        newStints = computeRace(raceData, newStints);
        

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
 
        yield takeLatest(RaceActionTypes.SAGA_CHANGE_SINGLE_STINT, handleChangeSingleStint),
        yield takeLatest(RaceActionTypes.SAGA_TEST_DOUBLE, handleSagaTestDouble),
        yield takeLatest(RaceActionTypes.SAGA_QUICK_PROPOSAL, handleQuickComputeProposal),
        yield takeLatest(RaceActionTypes.SAGA_CHANGE_CAR, handleChangeCar),
        yield takeLatest(RaceActionTypes.SAGA_CHANGE_TRACK, handleChangeTrack),
        
    ]);
}