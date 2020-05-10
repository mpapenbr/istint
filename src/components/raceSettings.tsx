import React from "react"
import { Button, Descriptions } from "antd"
import { useSelector } from "react-redux";
import { IRace, ITimedRace } from "../stores/race/types";


const RaceSettings: React.FC<ITimedRace> = (race:ITimedRace) => {
    return (
    <Descriptions title="Race settings">
        <Descriptions.Item label="Name">{race.name}</Descriptions.Item>        
        <Descriptions.Item label="Duration">{race.duration}</Descriptions.Item>        
    </Descriptions>
    );
}

export default RaceSettings

// 22:24