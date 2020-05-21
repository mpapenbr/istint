import React from "react"
import { Button, Descriptions, Table } from "antd"
import { useSelector } from "react-redux";
import { IRace, ITimedRace } from "../stores/race/types";
import { ColumnProps } from "antd/es/table";
import { Stint } from "../stores/stint/types";
import { secAsString } from "../utils/output";
import { sprintf } from "sprintf-js";

interface IDisplayStint extends  Stint {
    no : number;
}
const RaceStints: React.FC<ITimedRace> = (race:ITimedRace) => {
    // race.stints[].
    const columns : ColumnProps<IDisplayStint>[] = [
        {title:'#', dataIndex: 'no'},
        {title:'Driver', dataIndex: ['driver', 'name']},
        {title:'Laps', dataIndex: 'numLaps'},
        {title:'Avg', dataIndex: ['driver', 'baseLaptime'], render: (t) => secAsString(t)},
        {title:'Duration', dataIndex: 'duration', render: (t) => secAsString(t)},
        {title:'Fuel', dataIndex: 'fuel', render: (f) => sprintf("%0.2f", f)},
    ]
    const myRowKey = (item : IDisplayStint) => item.no;
    const enhancedStints : IDisplayStint[]= race.stints.map((v,i) => ({...v, no: i+1}));
    return (        
        <>        
        <Table<IDisplayStint> columns={columns} dataSource={enhancedStints} rowKey={myRowKey}/>
        </>
    );
}

export default RaceStints

// 22:24