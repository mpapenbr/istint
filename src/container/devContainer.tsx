import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import DevHelper from "../components/devhelper";
import { ApplicationState } from '../stores/index';
import { sagaTestDouble, setDings, setDuration } from "../stores/race/actions";
import { ISimpleRaceProposalParam } from "../stores/race/types";

const DevContainer: React.FC = () => {
    const dispatch = useDispatch();
    const stateToProps = useSelector(
        ({ race }: ApplicationState) => ({
            // raceTimeMsec: race.data.duration *60 *1000|| 0            
            raceTimeMsec: race.data.duration * 60 * 1000

        })
    );
    const dispatchToProps = {
        setDuration: useCallback((d: number) => dispatch(setDuration(d)), [dispatch]),
        sagaTestDouble: useCallback((d: number) => dispatch(sagaTestDouble(d)), [dispatch]),
        quickProposal: useCallback((param: ISimpleRaceProposalParam) => dispatch(setDings(param)), [dispatch]),
    };
    return (
        <DevHelper {...stateToProps} {...dispatchToProps} />);
}

export default DevContainer;