import { Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import React from "react";
import { sprintf } from "sprintf-js";
import { IPitTime, Stint } from "../../stores/stint/types";
import { secAsString } from "../../utils/output";
import PitToolTip from "../stint/pitToolTip";

interface IDispatchToProps {}
interface IStateToProps {
  raceDurationSecs: number;
  stints: Stint[];
}

type MyProps = IDispatchToProps & IStateToProps;

const QuickStintTable: React.FC<MyProps> = (props: MyProps) => {
  const columns: ColumnsType<Stint> = [
    { key: "no", title: "No", dataIndex: "no", align: "right" },
    { key: "laps", title: "Laps", dataIndex: "numLaps", align: "right" },
    {
      key: "duration",
      title: "Duration",
      dataIndex: "duration",
      render: (t: number) => secAsString(t),
      align: "right",
    },
    { key: "pit", title: "Pit", dataIndex: "pitTime", render: (d: IPitTime) => <PitToolTip {...d} />, align: "right" },
    { key: "fuel", title: "Fuel", dataIndex: "fuel", render: (f: number) => sprintf("%0.2f", f), align: "right" },
    {
      key: "remaining",
      title: "Remaining",
      dataIndex: ["rollingData", "elapsedTime"],

      render: (d: number, record: Stint) =>
        d < props.raceDurationSecs ? secAsString(props.raceDurationSecs - Math.ceil(d)) : "",
      align: "right",
    },
  ];
  return (
    <Table
      className="istint-compact"
      // rowClassName="istint-compact"
      pagination={false}
      columns={columns}
      dataSource={props.stints}
      rowKey={(d) => "Stint-" + d.no}
    />
  );
};

export default QuickStintTable;
