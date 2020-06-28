import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import RaceSettings from "../components/raceSettings";
import RaceStints from "../components/raceStints";
import { ApplicationState } from "../stores/index";
import {
  resetRace,
  sagaChangeCar,
  sagaChangeDuration,
  sagaChangeRaceRealStartTime as sagaChangeRaceStartReal,
  sagaChangeRaceSimStartTime as sagaChangeRaceStartSim,
  sagaChangeSingleStint,
  sagaChangeSingleStintAttributeFuelPerLap,
  sagaChangeSingleStintAttributeLaptime,
  sagaChangeSingleStintAttributeNumLaps,
  sagaChangeSingleStintAttributeTires,
  sagaChangeTrack,
  sagaMoveStint,
  setName,
} from "../stores/race/actions";
import { IModifyStintParam, IMoveStint } from "../stores/race/types";
import {
  updateAutoRepair,
  updateStintEditMode,
  updateStrategy,
  updateTimeDisplayMode,
} from "../stores/settings/actions";

const RaceContainer: React.FC = () => {
  const dispatch = useDispatch();
  // Note: use stateSettings via selector
  // const stateSettings = useSelector(({ settings }: ApplicationState) => ({ ...settings.data }));
  const stateToProps = useSelector(({ race, cars, tracks, settings }: ApplicationState) => ({
    raceData: race.data,
    carData: cars,
    trackData: tracks,
    settings: settings.data,
  }));
  const dispatchToProps = {
    updateStint: useCallback((param: IModifyStintParam) => dispatch(sagaChangeSingleStint(param)), [dispatch]),
    updateNumLaps: useCallback(
      (stintNo: number, value: number) =>
        dispatch(sagaChangeSingleStintAttributeNumLaps({ no: stintNo, value: value })),
      [dispatch]
    ),
    updateFuelPerLap: useCallback(
      (stintNo: number, value: number) =>
        dispatch(sagaChangeSingleStintAttributeFuelPerLap({ no: stintNo, value: value })),
      [dispatch]
    ),
    updateLaptime: useCallback(
      (stintNo: number, value: number) =>
        dispatch(sagaChangeSingleStintAttributeLaptime({ no: stintNo, value: value })),
      [dispatch]
    ),
    updateTireRequest: useCallback(
      (stintNo: number, value: boolean) => dispatch(sagaChangeSingleStintAttributeTires({ no: stintNo, value: value })),
      [dispatch]
    ),
    setCar: useCallback(
      (carId: number) => {
        //dispatch(sagaChangeSingleStint(param))
        console.log(carId);
        dispatch(sagaChangeCar(carId));
      },
      [dispatch]
    ),
    setTrack: useCallback((trackId: number) => dispatch(sagaChangeTrack(trackId)), [dispatch]),
    setAutoRepair: useCallback((b: boolean) => dispatch(updateAutoRepair(b)), [dispatch]),
    setStrategy: useCallback((id: number) => dispatch(updateStrategy(id)), [dispatch]),
    setRaceStartReal: useCallback((date: Date) => dispatch(sagaChangeRaceStartReal(date)), [dispatch]),
    setRaceStartSim: useCallback((date: Date) => dispatch(sagaChangeRaceStartSim(date)), [dispatch]),
    setDuration: useCallback((duration: number) => dispatch(sagaChangeDuration(duration)), [dispatch]),
    setName: useCallback((value: string) => dispatch(setName(value)), [dispatch]),
    moveStint: useCallback((param: IMoveStint) => dispatch(sagaMoveStint(param)), [dispatch]),
    setStintEditMode: useCallback((value: number) => dispatch(updateStintEditMode(value)), [dispatch]),
    setTimeDisplayMode: useCallback((value: number) => dispatch(updateTimeDisplayMode(value)), [dispatch]),
    reset: useCallback(() => dispatch(resetRace()), [dispatch]),
  };
  return (
    <div>
      <RaceSettings {...stateToProps} {...dispatchToProps} />
      <RaceStints {...stateToProps} {...dispatchToProps} />
    </div>
  );
};

export default RaceContainer;
