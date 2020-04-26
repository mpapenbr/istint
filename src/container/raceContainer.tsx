import React from "react"
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState} from '../stores/index'
import RaceSettings from "../components/raceSettings";

const RaceContainer : React.FC = () => {
    const dispatch = useDispatch();
    const stateToProps = useSelector(
        ({race}: ApplicationState) => ({
            data: race.data
            
        })
    );
    return (
    <div>
       <RaceSettings {...stateToProps.data} />
    </div>);
}

export default RaceContainer;