import React from "react"
import { Button, Descriptions, Table, InputNumber, Form } from "antd"
import { useSelector } from "react-redux";
import { IRace, ITimedRace } from "../stores/race/types";
import { ColumnProps } from "antd/es/table";
import { Stint } from "../stores/stint/types";
import { secAsString } from "../utils/output";
import { IBaseAction } from "../commons";
import { IDispatchToProps } from "./devhelper";
import { IDriver } from "../stores/driver/types";


interface IDispatchProps  {
    setFuelPerLap: (d:any) => any;
    setBaseLaptime: (d:any) => any;
    computeProposal: () => any;
}
interface IStateProps  {
    
    fuelPerLap: number,
    baseLaptime: number
}
type MyProps = IDispatchProps & IStateProps;
const DriverFuel: React.FC<MyProps> = (props:MyProps) => {
    // race.stints[].
   return (
       <>
            <InputNumber prefix="Fuel"  min={0} max={20} step={0.1} value={props.fuelPerLap} onChange={props.setFuelPerLap}/>       
            <InputNumber prefix="Time"  min={0} max={720} step={0.1} value={props.baseLaptime} onChange={props.setBaseLaptime}/>
            <Button onClick={props.computeProposal}>Compute</Button>
       </>
   );
}

export default DriverFuel

