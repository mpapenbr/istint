import React from "react"
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState} from '../stores/index'

const HelperContainer : React.FC = () => {
    const dispatch = useDispatch();
    const stateToProps = useSelector(
        ({race}: ApplicationState) => ({
            duration: race.data.duration
        })
    );
    return (
    <div>
        <h3>HelperBar</h3>
        <Button >Race 40min</Button>
    </div>);
}

export default HelperContainer;