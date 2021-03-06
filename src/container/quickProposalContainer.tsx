import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import QuickPlanningControl from "../components/proposal/quickPlanningControl";
import QuickProposal from "../components/proposal/quickProposal";
import { updateDefaultDriver } from "../stores/driver/actions";
import { ApplicationState } from "../stores/index";
import { computeQuickProposal } from "../stores/race/actions";
import { updateStrategy } from "../stores/settings/actions";

const QuickProposalContainer: React.FC = () => {
  const dispatch = useDispatch();
  const stateToProps = useSelector(({ ui, settings, driver }: ApplicationState) => ({
    // raceTimeMsec: race.data.duration *60 *1000|| 0
    settings: settings.data,
    fuelPerLap: driver.currentDriver.fuelPerLap,
    baseLaptime: driver.currentDriver.baseLaptime,
    doubleStintAdd: driver.currentDriver.doubleStintAdd,
  }));

  const currentDriver = useSelector(({ driver }: ApplicationState) => ({ driver: { ...driver.currentDriver } }));
  const allDrivers = useSelector(({ driver }: ApplicationState) => driver.allDrivers);
  const race = useSelector(({ race }: ApplicationState) => ({ race: { ...race.data } }));
  const settings = useSelector(({ settings }: ApplicationState) => ({ ...settings.data }));

  const dispatchToProps = {
    setFuelPerLap: useCallback(
      (d: number) => dispatch(updateDefaultDriver({ ...currentDriver.driver, fuelPerLap: d })),
      [dispatch, currentDriver.driver]
    ),
    setBaseLaptime: useCallback(
      (d: number) => dispatch(updateDefaultDriver({ ...currentDriver.driver, baseLaptime: d })),
      [dispatch, currentDriver.driver]
    ),
    setDoubleStintAdd: useCallback(
      (d: number) => dispatch(updateDefaultDriver({ ...currentDriver.driver, doubleStintAdd: d })),
      [dispatch, currentDriver.driver]
    ),
    setStrategy: useCallback((id: number) => dispatch(updateStrategy(id)), [dispatch]),
    computeProposal: useCallback(() => {
      const param = {
        duration: race.race.duration,
        driver: allDrivers,
        strategy: settings.strategy,
      };
      dispatch(computeQuickProposal(param));
    }, [dispatch, allDrivers, race, settings]),
  };

  return (
    <>
      <QuickProposal {...stateToProps} {...dispatchToProps} />
      <QuickPlanningControl />
    </>
  );
};

export default QuickProposalContainer;
