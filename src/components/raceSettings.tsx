import React from "react"
import { Button, Descriptions, Switch } from "antd"
import { useSelector } from "react-redux";
import { IRace, ITimedRace } from "../stores/race/types";
import { ISettingsState, ISettings } from "../stores/settings/types";
import { RaceStrategyMode } from '../stores/stint/types';
import RaceStrategySelect from "./strategySelect";
import TrackSelect from "./trackSelect";
import { CarState } from "../stores/car/types";
import CarSelect from "./carSelect";
import { TrackState } from "../stores/track/types";

interface IStateProps {
    raceData: ITimedRace,
    settings: ISettings,
    carData: CarState,
    trackData: TrackState,

}
interface IDispatchProps {
    setAutoRepair: (data:boolean) => void;
    setStrategy: (data:number) => void;
    setCar: (carId:number) => void;
    setTrack: (trackId:number) => void;
}

type MyProps = IStateProps & IDispatchProps;

const RaceSettings: React.FC<MyProps> = ({settings,raceData,carData,trackData,setAutoRepair,setStrategy,setCar, setTrack}:MyProps) => {
    return (
    <>
        <Descriptions title="Race settings">
            <Descriptions.Item label="Name">{raceData.name}</Descriptions.Item>        
            <Descriptions.Item label="Duration">{raceData.duration}</Descriptions.Item>       
            <Descriptions.Item label="Stint-Auto-Repair"><Switch checked={settings.autoRepair} onChange={setAutoRepair}/></Descriptions.Item>       
            <Descriptions.Item label="Strategy"><RaceStrategySelect current={settings.strategy} selectStrategy={setStrategy} /></Descriptions.Item>       
            <Descriptions.Item label="Car"><CarSelect current={raceData.car} cars={carData.allCars} selectCar={setCar} /></Descriptions.Item>       
            <Descriptions.Item label="Track"><TrackSelect current={raceData.track} tracks={trackData.allTracks} selectTrack={setTrack} /></Descriptions.Item>       
            
        </Descriptions>
        
    </>
    );
}

export default RaceSettings

// 22:24