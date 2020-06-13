import { Button, Descriptions, Switch } from "antd";
import React from "react";
import { CarState } from "../stores/car/types";
import { ITimedRace } from "../stores/race/types";
import { ISettings } from "../stores/settings/types";
import { TrackState } from "../stores/track/types";
import CarSelect from "./carSelect";
import RaceStrategySelect from "./strategySelect";
import TrackSelect from "./trackSelect";

interface IStateProps {
    raceData: ITimedRace,
    settings: ISettings,
    carData: CarState,
    trackData: TrackState,

}
interface IDispatchProps {
    setAutoRepair: (data: boolean) => void;
    setStrategy: (data: number) => void;
    setCar: (carId: number) => void;
    setTrack: (trackId: number) => void;
    reset: () => void;
}

type MyProps = IStateProps & IDispatchProps;

const RaceSettings: React.FC<MyProps> = ({ settings, raceData, carData, trackData, setAutoRepair, setStrategy, setCar, setTrack, reset }: MyProps) => {
    return (
        <>
            <Descriptions title="Race settings">
                <Descriptions.Item label="Name">{raceData.name}</Descriptions.Item>
                <Descriptions.Item label="Duration">{raceData.duration}</Descriptions.Item>
                <Descriptions.Item label="Stint-Auto-Repair"><Switch checked={settings.autoRepair} onChange={setAutoRepair} /></Descriptions.Item>
                <Descriptions.Item label="Strategy"><RaceStrategySelect current={settings.strategy} selectStrategy={setStrategy} /></Descriptions.Item>
                <Descriptions.Item label="Car"><CarSelect current={raceData.car} cars={carData.allCars} selectCar={setCar} /></Descriptions.Item>
                <Descriptions.Item label="Track"><TrackSelect current={raceData.track} tracks={trackData.allTracks} selectTrack={setTrack} /></Descriptions.Item>
                <Descriptions.Item label=""><Button onClick={reset}>Reset</Button></Descriptions.Item>

            </Descriptions>

        </>
    );
}

export default RaceSettings

// 22:24