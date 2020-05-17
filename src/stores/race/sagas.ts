import { all, call, fork, put, takeEvery, takeLatest } from "redux-saga/effects";
import { IBaseAction } from "../../commons";
import { RaceActionTypes } from "./types";
import { TimeBasedStintParam } from "../stint/types";

function* handleSagaTest(action:IBaseAction) : Generator {
    try {        
        const duration = action.payload; 
        yield put({type: RaceActionTypes.SET_DURATION, payload:duration})
    } catch (e) {
        console.log(e)
    }
}

function* handleComputeProposal(action:IBaseAction) : Generator {
    try {        
        const param : TimeBasedStintParam = action.payload; 
        console.log(param);
        yield put({type: RaceActionTypes.COMPUTE_PROPOSAL, payload:param})
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
        yield takeLatest(RaceActionTypes.SAGA_TEST_DOUBLE, handleSagaTestDouble),
        
    ]);
}