import React, { useCallback } from "react"
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState} from '../stores/index'
import DriverFuel from "../components/driverFuel";
import { updateDefaultDriver } from "../stores/driver/actions";
import { IDriver } from "../stores/driver/types";
import { computeRaceProposal } from "../stores/race/actions";

const DriverContainer : React.FC = () => {

    const dispatch = useDispatch();
    const stateToProps = useSelector( 
        ({driver}: ApplicationState) => ({
            // raceTimeMsec: race.data.duration *60 *1000|| 0            
            fuelPerLap: driver.data.fuelPerLap,
            baseLaptime: driver.data.baseLaptime
            
        })
    );
    const currentDriver = useSelector(({driver}:ApplicationState) => ({driver: {...driver.data}}))
    const race = useSelector(({race}:ApplicationState) => ({race: {...race.data}}))
    
    const dispatchToProps = {
        setFuelPerLap: useCallback((d:number) => dispatch(updateDefaultDriver({...currentDriver.driver, fuelPerLap:d})), [dispatch]),
        setBaseLaptime: useCallback((d:number) => dispatch(updateDefaultDriver({...currentDriver.driver, baseLaptime:d})), [dispatch]),
        computeProposal: useCallback(() => {
            console.log(currentDriver);
            console.log(race);
            dispatch(computeRaceProposal({avgLaptime:currentDriver.driver.baseLaptime, fuelConsumption:currentDriver.driver.fuelPerLap, racetime: race.race.duration * 1000, tank:100}))},
            [dispatch])
        ,
    }
   
    return (
    <div>
       <DriverFuel {...stateToProps} {...dispatchToProps} /> 
    </div>);
}

export default DriverContainer;