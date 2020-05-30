import React, { useCallback } from "react"
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState} from '../stores/index'
import RaceSettings from "../components/raceSettings";
import RaceStints from "../components/raceStints";
import { IDriver } from "../stores/driver/types";
import { updateDefaultDriver } from "../stores/driver/actions";
import { IModifyStintParam } from "../stores/race/types";
import {sagaChangeSingleStint, sagaChangeCar} from '../stores/race/actions';
import { ICar } from "../stores/car/types";
import CarSelect from "../components/carSelect";

const RaceContainer : React.FC = () => {
    const dispatch = useDispatch();
    const stateToProps = useSelector(
        ({race,cars}: ApplicationState) => ({
            raceData: race.data,
            cars: cars.allCars,
            current: race.data.car,
        })
    );
    const dispatchToProps = {
        updateStint: useCallback((param:IModifyStintParam) => dispatch(sagaChangeSingleStint(param)), [dispatch]),
        selectCar: useCallback((carId:number) => {
            //dispatch(sagaChangeSingleStint(param))
            console.log(carId);
            dispatch(sagaChangeCar(carId));
        }, [dispatch]),
    }
    return (
    <div>
       <RaceSettings {...stateToProps.raceData} />
       <CarSelect {...stateToProps} {...dispatchToProps}/>
       <RaceStints {...stateToProps} {...dispatchToProps}/>
    </div>);
}

export default RaceContainer;