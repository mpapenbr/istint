import { Button, Descriptions, Switch } from "antd";
import React from "react";
import { CarState } from "../stores/car/types";
import { ITimedRace } from "../stores/race/types";
import { ISettings } from "../stores/settings/types";
import { TrackState } from "../stores/track/types";
import CarSelect from "./carSelect";
import DurationInput from "./durationInput";
import RaceName from "./raceName";
import RaceStartSelect from "./raceStartSelect";
import StintEditModeSelect from "./stint/stintEditModeSelect";
import TimeDisplayModeSelect from "./stint/timeDisplayModeSelect";
import RaceStrategySelect from "./strategySelect";
import TrackSelect from "./trackSelect";

interface IStateProps {
  raceData: ITimedRace;
  settings: ISettings;
  carData: CarState;
  trackData: TrackState;
}
interface IDispatchProps {
  setAutoRepair: (data: boolean) => void;
  setStrategy: (data: number) => void;
  setCar: (carId: number) => void;
  setTrack: (trackId: number) => void;
  setRaceStartReal: (date: Date) => void;
  setRaceStartSim: (date: Date) => void;
  setDuration: (duration: number) => void;
  setName: (value: string) => void;
  setStintEditMode: (value: number) => void;
  setTimeDisplayMode: (value: number) => void;
  reset: () => void;
}

type MyProps = IStateProps & IDispatchProps;

const RaceSettings: React.FC<MyProps> = ({
  settings,
  raceData,
  carData,
  trackData,
  setAutoRepair,
  setStrategy,
  setCar,
  setTrack,
  setRaceStartReal,
  setRaceStartSim,
  setDuration,
  setName,
  setStintEditMode,
  setTimeDisplayMode,
  reset,
}: MyProps) => {
  return (
    <>
      <Descriptions column={4} title="Race settings">
        <Descriptions.Item label="">
          <RaceName name={raceData.name} setName={setName} />
        </Descriptions.Item>
        <Descriptions.Item label="">
          <DurationInput durationMin={raceData.duration} setDuration={setDuration} />
        </Descriptions.Item>
        <Descriptions.Item>
          <RaceStartSelect time={raceData.startReal} setDate={setRaceStartReal} />
        </Descriptions.Item>

        <Descriptions.Item>
          <RaceStartSelect time={raceData.startSim} setDate={setRaceStartSim} />
        </Descriptions.Item>

        <Descriptions.Item label="Stint-Auto-Repair">
          <Switch checked={settings.autoRepair} onChange={setAutoRepair} />
        </Descriptions.Item>
        <Descriptions.Item label="Strategy">
          <RaceStrategySelect current={settings.strategy} selectStrategy={setStrategy} />
        </Descriptions.Item>
        <Descriptions.Item label="Car">
          <CarSelect current={raceData.car} cars={carData.allCars} selectCar={setCar} />
        </Descriptions.Item>
        <Descriptions.Item label="Track">
          <TrackSelect current={raceData.track} tracks={trackData.allTracks} selectTrack={setTrack} />
        </Descriptions.Item>
        <Descriptions.Item label="">
          <Button onClick={reset}>Reset</Button>
        </Descriptions.Item>
        <Descriptions.Item label="">
          <StintEditModeSelect current={settings.stintEditMode} selectStintEditMode={setStintEditMode} />
        </Descriptions.Item>
        <Descriptions.Item label="">
          <TimeDisplayModeSelect current={settings.timeDisplayMode} selectTimeDisplayMode={setTimeDisplayMode} />
        </Descriptions.Item>
      </Descriptions>
    </>
  );
};

export default RaceSettings;

// 22:24
