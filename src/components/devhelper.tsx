import React, { useEffect } from "react"
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Action, PayloadAction } from "typesafe-actions";
import { setDuration } from "../stores/race/actions";
import { TimeBasedStintParam, RaceStrategyMode } from "../stores/stint/types";
import { ITimedRace, ISimpleRaceProposalParam } from "../stores/race/types";



export interface IDispatchToProps {
	setDuration: (d:number) => any; // das passt noch nicht. Ich wüsste noch gern, was hier wirklich statt any stehen sollte.	
    sagaTestDouble: (d:number) => any; // das passt noch nicht. Ich wüsste noch gern, was hier wirklich statt any stehen sollte.
    quickProposal: (param: ISimpleRaceProposalParam) => any;
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
        
        <Button onClick={() => {props.quickProposal({
            name: "QuickProposal",
            duration: 6*60,
            driver: {
                baseLaptime: 230,
                fuelPerLap: 6.7,
                name: "SampleDriver"
            },
            strategy: RaceStrategyMode.DOUBLE_STINT_TIRES,
            })}}>6h/LeMans</Button>
        <Button onClick={() => {props.sagaTestDouble(90)}}>SagaTestDouble</Button>
    </div>);
}

export default DevHelper;