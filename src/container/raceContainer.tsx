import React, { useCallback } from "react"
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState} from '../stores/index'
import RaceSettings from "../components/raceSettings";
import RaceStints from "../components/raceStints";
import { IDriver } from "../stores/driver/types";
import { updateDefaultDriver } from "../stores/driver/actions";
import { IModifyStintParam } from "../stores/race/types";
import {sagaChangeSingleStint} from '../stores/race/actions';

const RaceContainer : React.FC = () => {
    const dispatch = useDispatch();
    const stateToProps = useSelector(
        ({race}: ApplicationState) => ({
            raceData: race.data
            
        })
    );
    const dispatchToProps = {
        updateStint: useCallback((param:IModifyStintParam) => dispatch(sagaChangeSingleStint(param)), [dispatch]),
    }
    return (
    <div>
       <RaceSettings {...stateToProps.raceData} />
       <RaceStints {...stateToProps} {...dispatchToProps}/>
    </div>);
}

export default RaceContainer;