import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import DriverFuel from "../components/driverFuel";
import { updateDefaultDriver } from "../stores/driver/actions";
import { ApplicationState } from '../stores/index';
import { computeQuickProposal } from "../stores/race/actions";


const DriverContainer: React.FC = () => {

    const dispatch = useDispatch();
    const stateToProps = useSelector(
        ({ driver }: ApplicationState) => {
            // console.log({...driver.data});
            return ({
                // raceTimeMsec: race.data.duration *60 *1000|| 0          

                fuelPerLap: driver.currentDriver.fuelPerLap,
                baseLaptime: driver.currentDriver.baseLaptime

            })
        }
    );
    const currentDriver = useSelector(({ driver }: ApplicationState) => ({ driver: { ...driver.currentDriver } }))
    const race = useSelector(({ race }: ApplicationState) => ({ race: { ...race.data } }))
    const settings = useSelector(({ settings }: ApplicationState) => ({ ...settings.data }))

    const dispatchToProps = {
        setFuelPerLap: useCallback((d: number) => dispatch(updateDefaultDriver({ ...currentDriver.driver, fuelPerLap: d })), [dispatch, currentDriver.driver]),
        setBaseLaptime: useCallback((d: number) => dispatch(updateDefaultDriver({ ...currentDriver.driver, baseLaptime: d })), [dispatch, currentDriver.driver]),

        computeProposal: useCallback(() => {
            const param = {
                name: "QuickProposal2",
                duration: race.race.duration,
                driver: currentDriver.driver,
                strategy: settings.strategy,
            };
            dispatch(computeQuickProposal(param))
        },
            [dispatch, currentDriver, race, settings]),

    }

    return (
        <div>
            <DriverFuel {...stateToProps} {...dispatchToProps} />
        </div>);
}

export default DriverContainer;