import React, { useEffect } from "react"
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Action, PayloadAction } from "typesafe-actions";
import { setDuration } from "../stores/race/actions";
import { TimeBasedStintParam } from "../stores/stint/types";
import { ITimedRace } from "../stores/race/types";



export interface IDispatchToProps {
	setDuration: (d:number) => any; // das passt noch nicht. Ich wüsste noch gern, was hier wirklich statt any stehen sollte.
	computeProposal: (param:TimeBasedStintParam) => any; // das passt noch nicht. Ich wüsste noch gern, was hier wirklich statt any stehen sollte.
	sagaTestDouble: (d:number) => any; // das passt noch nicht. Ich wüsste noch gern, was hier wirklich statt any stehen sollte.
}
interface IStateToProps {
    raceTimeMsec: number;
}
type MyProps = IDispatchToProps & IStateToProps;
const DevHelper : React.FC<MyProps> = (props:MyProps) => {
    
    console.log("duration" + props.raceTimeMsec);
    return (
        <div>
        <h3>HelperBar</h3>
        <Button onClick={() => {props.setDuration(40)}}>Race 40min  </Button>
        <Button onClick={() => {props.setDuration(60)}}>Race 60min  </Button>
        <Button onClick={() => {props.setDuration(6*60)}}>Race 6h  </Button>
        <Button onClick={() => {props.setDuration(12*60)}}>Race 12h  </Button>
        <Button onClick={() => {props.setDuration(24*60)}}>Race 24h  </Button>
        <Button onClick={() => {props.computeProposal({avgLaptime:90*1000, fuelConsumption:3, racetime: props.raceTimeMsec, tank:100})}}>90s/3l</Button>
        <Button onClick={() => {props.computeProposal({avgLaptime:490*1000, fuelConsumption:12.5, racetime: props.raceTimeMsec, tank:100})}}>8:10m/12.5l</Button>
        <Button onClick={() => {props.sagaTestDouble(90)}}>SagaTestDouble</Button>
    </div>);
}

export default DevHelper;