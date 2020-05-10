import React, { useCallback } from "react"
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState} from '../stores/index'
import { setDuration, sagaTest, sagaTestDouble } from "../stores/race/actions";
import DevHelper, {IDispatchToProps} from "../components/devhelper";

const DevContainer : React.FC = () => {
    const dispatch = useDispatch();
    
    const dispatchToProps = {
        setDuration: useCallback((d:number) => dispatch(setDuration(d)), [dispatch]),
        sagaTest: useCallback((d: number) => dispatch(sagaTest(d)), [dispatch]),
        sagaTestDouble: useCallback((d: number) => dispatch(sagaTestDouble(d)), [dispatch]),
	};
    return (
    <DevHelper  {...dispatchToProps}/>);
}

export default DevContainer;