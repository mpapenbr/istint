import { Col, Row } from "antd";
import _ from "lodash";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sprintf } from "sprintf-js";
import { ApplicationState } from "../../stores";
import { sagaChangeSingleStintDriver } from "../../stores/race/actions";
import { IChangeStintDriver } from "../../stores/race/types";
import { Stint } from "../../stores/stint/types";
import AssignableDriver from "./assignableDriver";
import "./compact-stints.css";
import DroppableStint from "./droppableStint";

interface IStateProps {
  //  raceData: ITimedRace;
}
interface IDispatchProps {}
type MyProps = IStateProps & IDispatchProps;

const CompactStints: React.FC<MyProps> = (props: MyProps) => {
  // const data = _.range(1,25).map((i) => ({no:i, duration: 50}));
  const data = [
    { id: 1, name: "A" },
    { id: 2, name: "B" },
    { id: 3, name: "C" },
  ];
  const raceData = useSelector(({ race }: ApplicationState) => ({ ...race.data }));

  // const driverData = driverState.allDrivers;
  const driverData = useSelector(({ driver }: ApplicationState) => ({ ...driver }.allDrivers));
  const dispatch = useDispatch();
  const dispatchToProps = {
    setDriver: useCallback((param: IChangeStintDriver) => dispatch(sagaChangeSingleStintDriver(param)), [dispatch]),
    // sagaTestDouble: useCallback((d: number) => dispatch(sagaTestDouble(d)), [dispatch]),
    // quickProposal: useCallback((param: ISimpleRaceProposalParam) => dispatch(computeQuickProposal(param)), [dispatch]),
  };
  if (raceData.stints.length === 0) {
    return <div>No data</div>;
  }

  const maxValue = _.last(raceData.stints)!.realTime.end.getTime();
  const minValue = _.first(raceData.stints)!.realTime.start.getTime();
  const spread = maxValue - minValue;
  const getStart = (item: Stint): number => item.realTime.start.getTime();
  const getEnd = (item: Stint): number => item.realTime.end.getTime();
  const leftSpace = (item: Stint): number => (getStart(item) - minValue) / spread;
  const entrySpace = (item: Stint): number => (getEnd(item) - getStart(item)) / spread;
  const rightSpace = (item: Stint): number => (maxValue - getEnd(item)) / spread;
  const doubleFlexArg = (v: number): string => sprintf("%.3f %.3f", v, v);

  return (
    <div>
      <Row>
        <Col flex={2}>
          {driverData.map((d) => (
            <Row style={{ backgroundColor: d.backgroundColor }}>
              <Col className="driver-source">
                <AssignableDriver driverId={d.id} name={d.name} {...dispatchToProps} />
              </Col>
            </Row>
          ))}
        </Col>

        <Col flex={3}>
          {raceData.stints.map((s) => (
            <Row style={{ backgroundColor: s.driver.backgroundColor }}>
              <Col className="stint-plan">
                <DroppableStint no={s.no}>
                  <p>
                    Driver {s.driver.name} -{s.driver.backgroundColor}-
                  </p>
                </DroppableStint>
                {/* {i.no} left: {leftSpace(i)} entry: {entrySpace(i)} */}
              </Col>
            </Row>
          ))}
        </Col>
      </Row>
    </div>
  );
};
export default CompactStints;
