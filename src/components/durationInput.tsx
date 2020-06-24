import { InputNumber } from "antd";
// import moment, { Moment } from "moment";
import React from "react";

interface IDispatchProps {
  setDuration: (duration: number) => any;
}
interface IStateProps {
  durationMin: number;
}
type MyProps = IDispatchProps & IStateProps;
const DurationInput: React.FC<MyProps> = (props: MyProps) => {
  const onChange = (value: string | number | undefined) => {
    props.setDuration(value as number);
  };

  return (
    <span className="ant-input-wrapper ant-input-group">
      <span className="ant-input-group-addon">Duration</span>
      <InputNumber min={0} max={1440} step={1} value={props.durationMin} onChange={onChange} />
    </span>
  );
};

export default DurationInput;
