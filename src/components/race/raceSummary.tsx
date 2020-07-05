import { Col, Row, Statistic } from "antd";
import _ from "lodash";
import React, { ReactNode } from "react";
import { ITimedRace } from "../../stores/race/types";
import { secAsString } from "../../utils/output";

interface IStateProps {
  raceData: ITimedRace;
}
type MyProps = IStateProps;
const RaceSummary: React.FC<MyProps> = (props: MyProps) => {
  const timeFormatter = (value: any): ReactNode => {
    return <span>{secAsString(value as number)}</span>;
  };
  return (
    <>
      <Row>
        <Col span={4}>
          <Statistic title="Track" value={props.raceData.track.name} />
        </Col>
        <Col span={4}>
          <Statistic title="Car" value={props.raceData.car.name} />
        </Col>
        <Col span={2}>
          <Statistic title="Race length" formatter={timeFormatter} value={props.raceData.duration * 60} />
        </Col>
        <Col span={2}>
          <Statistic title="Stints" value={props.raceData.stints.length} />
        </Col>
        <Col span={2}>
          <Statistic title="Total laps" value={_.last(props.raceData.stints)?.rollingData.elapsedLaps} />
        </Col>
        <Col span={2}>
          <Statistic
            title="Total time"
            formatter={timeFormatter}
            value={_.last(props.raceData.stints)?.rollingData.elapsedTime}
          />
        </Col>
      </Row>
    </>
  );
};

export default RaceSummary;
