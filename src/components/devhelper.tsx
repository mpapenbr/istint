import React, { useEffect } from "react"
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Action, PayloadAction } from "typesafe-actions";
import { setDuration } from "../stores/race/actions";



export interface IDispatchToProps {
	setDuration: (d:number) => any; // das passt noch nicht. Ich wüsste noch gern, was hier wirklich statt any stehen sollte.
	sagaTest: (d:number) => any; // das passt noch nicht. Ich wüsste noch gern, was hier wirklich statt any stehen sollte.
	sagaTestDouble: (d:number) => any; // das passt noch nicht. Ich wüsste noch gern, was hier wirklich statt any stehen sollte.
}
const DevHelper : React.FC<IDispatchToProps> = (props:IDispatchToProps) => {
    
   
    return (
    <div>
        <h3>HelperBar</h3>
        <Button onClick={() => {props.setDuration(40)}}>Race 40min  </Button>
        <Button onClick={() => {props.setDuration(60)}}>Race 60min  </Button>
        <Button onClick={() => {props.sagaTest(90)}}>SagaTest</Button>
        <Button onClick={() => {props.sagaTestDouble(90)}}>SagaTestDouble</Button>
    </div>);
}

export default DevHelper;