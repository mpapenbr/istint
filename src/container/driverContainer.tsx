import React, { useCallback } from "react"
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState} from '../stores/index'
import DriverFuel from "../components/driverFuel";
import { updateDefaultDriver } from "../stores/driver/actions";
import { IDriver } from "../stores/driver/types";
import { sagaComputeRaceProposal } from "../stores/race/actions";
import { TimeDriverBasedStintParam } from "../stores/stint/types";
import { defaultCar } from "../stores/car/types"

const DriverContainer : React.FC = () => {

    const dispatch = useDispatch();
    const stateToProps = useSelector( 
        ({driver}: ApplicationState) => {
            // console.log({...driver.data});
            return ({
            // raceTimeMsec: race.data.duration *60 *1000|| 0          
            
            fuelPerLap: driver.data.fuelPerLap,
            baseLaptime: driver.data.baseLaptime
            
        })}
    );
    const currentDriver = useSelector(({driver}:ApplicationState) => ({driver: {...driver.data}}))
    const race = useSelector(({race}:ApplicationState) => ({race: {...race.data}}))
    const param : TimeDriverBasedStintParam = {
        racetime:race.race.duration * 60,
        car: defaultCar,
        driver: currentDriver.driver
    }
    const dispatchToProps = {
        setFuelPerLap: useCallback((d:number) => dispatch(updateDefaultDriver({...currentDriver.driver, fuelPerLap:d})), [dispatch,currentDriver.driver]),
        setBaseLaptime: useCallback((d:number) => dispatch(updateDefaultDriver({...currentDriver.driver, baseLaptime:d})), [dispatch,currentDriver.driver]),
        
        computeProposal: useCallback(() => {            
            dispatch(sagaComputeRaceProposal({...currentDriver.driver}))},        
            [dispatch, currentDriver]),
        
    }
   
    return (
    <div>
       <DriverFuel {...stateToProps} {...dispatchToProps} /> 
    </div>);
}

export default DriverContainer;