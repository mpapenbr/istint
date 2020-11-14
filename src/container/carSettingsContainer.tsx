import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import CarMaster from "../components/car/carMaster";
import { ICar } from "../stores/car/types";
import { ApplicationState } from "../stores/index";
import { sagaChangeCar, sagaChangedCarData } from "../stores/race/actions";

const CarSettingsContainer: React.FC = () => {
  const dispatch = useDispatch();
  const stateToProps = useSelector(({ cars, race }: ApplicationState) => ({
    // raceTimeMsec: race.data.duration *60 *1000|| 0
    cars: cars,
    raceData: race.data,
  }));
  const dispatchToProps = {
    setCar: useCallback(
      (carId: number) => {
        dispatch(sagaChangeCar(carId));
      },
      [dispatch]
    ),
    updateCar: useCallback(
      (data: ICar) => {
        dispatch(sagaChangedCarData(data));
      },
      [dispatch]
    ),
    // setDuration: useCallback((d: number) => dispatch(setDuration(d)), [dispatch]),
    // sagaTestDouble: useCallback((d: number) => dispatch(sagaTestDouble(d)), [dispatch]),
    // quickProposal: useCallback((param: ISimpleRaceProposalParam) => dispatch(computeQuickProposal(param)), [dispatch]),
  };
  return <CarMaster {...stateToProps} {...dispatchToProps} />;
};

export default CarSettingsContainer;
