import React, { useCallback } from "react"
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState} from '../stores/index'
import { setDuration, sagaTest, sagaTestDouble, computeRaceProposalTry } from "../stores/race/actions";
import DevHelper, {IDispatchToProps} from "../components/devhelper";
import { TimeBasedStintParam } from "../stores/stint/types";

const DevContainer : React.FC = () => {
    const dispatch = useDispatch();
    const stateToProps = useSelector(
        ({race}: ApplicationState) => ({
            // raceTimeMsec: race.data.duration *60 *1000|| 0            
            raceTimeMsec: race.data.duration *60 *1000
            
        })
    );
    const dispatchToProps = {
        setDuration: useCallback((d:number) => dispatch(setDuration(d)), [dispatch]),
        computeProposal: useCallback((param : TimeBasedStintParam) => dispatch(computeRaceProposalTry(param)), [dispatch]),
        sagaTestDouble: useCallback((d: number) => dispatch(sagaTestDouble(d)), [dispatch]),
        duration: 45
	};
    return (
    <DevHelper {...stateToProps} {...dispatchToProps}/>);
}

export default DevContainer;