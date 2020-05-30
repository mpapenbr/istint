import { all, call, fork, put,  takeEvery, takeLatest, select, StrictEffect } from "redux-saga/effects";
import { IBaseAction } from "../../commons";
import { RaceActionTypes, ITimedRace, IModifyStintParam, ISimpleRaceProposalParam } from "./types";
import { TimeBasedStintParam, Stint, TimeDriverBasedStintParam } from "../stint/types";
import { TireChangeMode, CarState, ICar } from '../car/types';
import { IDriver, DriverActionTypes, defaultDriver, DriverState } from "../driver/types";
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

function* handleComputeProposal(action:IBaseAction) 
//: Generator<StrictEffect,void, Stint[]> 
: Generator
{
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
        const proposal = computeProposal(param);
        const stints = computeRace(raceData, proposal);
        yield put({type: RaceActionTypes.SET_STINTS, payload:stints})
    } catch (e) {
        console.log(e)
    }
}

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
            const param : TimeDriverBasedStintParam = {
                car: newCar,
                driver: driverState.data,
                racetime: raceData.duration*60,
            }
            const proposal = computeProposal(param);
            const stints = computeRace({...raceData, car: newCar}, proposal);
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
        // console.log(raceData);
        const param : TimeDriverBasedStintParam = {
            car: raceData.car,
            driver: myParam.driver,
            racetime: myParam.duration*60,
        }
        const proposal = computeProposal(param);
        const stints = computeRace(raceData, proposal);
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
        console.log("pitWorkTime: " + pitWorkTime());
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

const computeProposal = (param :TimeDriverBasedStintParam) : Stint[] => {
    let stintNo = 1;
    const stint = computeTimebased(param) // now we know how much is possible per tank
    stint.no = stintNo;
    console.log("computeProposal with ",{...param}, " results in ",{...stint})
    const stintBreak = 5
    let remainingTime = param.racetime - stint.duration
    let ret = [];
    ret.push(stint);
    
    
    while (remainingTime > 0) {        
       const next =  computeTimebased({...param, racetime:remainingTime})
       next.no = ++stintNo;
       // console.log(next)
       ret.push(next)
       remainingTime -= next.duration + stintBreak;
       // console.log("remainingTime:", remainingTime)
    }
    return ret;
}

const computeTimebased = (param : TimeDriverBasedStintParam) : Stint => {
    const numLapsByTime = Math.max(1,Math.ceil(param.racetime / param.driver.baseLaptime))
    const numLapsByTank = Math.floor(param.car.tank / param.driver.fuelPerLap)
    const numLaps = Math.min(numLapsByTank, numLapsByTime)
    const duration = numLaps * param.driver.baseLaptime
    const fuel = numLaps * param.driver.fuelPerLap
    return {...defaultStint, driver: _.clone(param.driver), numLaps:numLaps,duration:duration, fuel:fuel}
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
        newStints.splice(idx, 1, {...defaultStint, driver:param.driver, numLaps:param.numLaps, no:param.no})
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
        yield takeLatest(RaceActionTypes.SAGA_COMPUTE_PROPOSAL, handleComputeProposal),
        yield takeLatest(RaceActionTypes.SAGA_CHANGE_SINGLE_STINT, handleChangeSingleStint),
        yield takeLatest(RaceActionTypes.SAGA_TEST_DOUBLE, handleSagaTestDouble),
        yield takeLatest(RaceActionTypes.SAGA_QUICK_PROPOSAL, handleQuickComputeProposal),
        yield takeLatest(RaceActionTypes.SAGA_CHANGE_CAR, handleChangeCar),
        
    ]);
}