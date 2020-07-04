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
      <Row gutter={16}>
        <Col span={2}>
          <Statistic title="Stints" value={props.raceData.stints.length + 1} />
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
