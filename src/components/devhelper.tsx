import { Button } from "antd";
import React from "react";
import { IDriver } from "../stores/driver/types";
import { ISimpleRaceProposalParam } from "../stores/race/types";
import { RaceStrategyMode } from "../stores/stint/types";
import ExportButton from "./exportButton";
import ImportButton from "./importButton";

export interface IDispatchToProps {
  setDuration: (d: number) => void;
  sagaTestDouble: (d: number) => void;
  quickProposal: (param: ISimpleRaceProposalParam) => void;
}
interface IStateToProps {
  raceTimeMsec: number;
  drivers: IDriver[];
}
type MyProps = IDispatchToProps & IStateToProps;
const DevHelper: React.FC<MyProps> = (props: MyProps) => {
  console.log("duration" + props.raceTimeMsec);

  const leMansDrivers = props.drivers.map((d) => ({ ...d, baseLaptime: 230, fuelPerLap: 6.7 }));
  return (
    <div>
      <h3>HelperBar</h3>
      <Button
        onClick={() => {
          props.setDuration(40);
        }}
      >
        Race 40min{" "}
      </Button>
      <Button
        onClick={() => {
          props.setDuration(60);
        }}
      >
        Race 60min{" "}
      </Button>
      <Button
        onClick={() => {
          props.setDuration(6 * 60);
        }}
      >
        Race 6h{" "}
      </Button>
      <Button
        onClick={() => {
          props.setDuration(12 * 60);
        }}
      >
        Race 12h{" "}
      </Button>
      <Button
        onClick={() => {
          props.setDuration(24 * 60);
        }}
      >
        Race 24h{" "}
      </Button>

      <Button
        onClick={() => {
          props.quickProposal({
            duration: 6 * 60,
            driver: leMansDrivers,
            strategy: RaceStrategyMode.DOUBLE_STINT_TIRES,
          });
        }}
      >
        6h/LeMans
      </Button>
      <Button
        onClick={() => {
          props.sagaTestDouble(90);
        }}
      >
        SagaTestDouble
      </Button>
      <ExportButton />
      <ImportButton />
    </div>
  );
};

export default DevHelper;
