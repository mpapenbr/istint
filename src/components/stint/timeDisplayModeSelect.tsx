import { Radio } from "antd";
import { RadioChangeEvent } from "antd/lib/radio/interface";
import React from "react";
import { TimeDisplayMode } from "../../stores/settings/types";

interface IDispatchProps {
  selectTimeDisplayMode: (id: number) => any;
}
interface IStateProps {
  current: TimeDisplayMode;
}
type MyProps = IDispatchProps & IStateProps;
const TimeDisplayModeSelect: React.FC<MyProps> = (props: MyProps) => {
  const onChange = (e: RadioChangeEvent) => {
    props.selectTimeDisplayMode(e.target.value);
  };
  return (
    <>
      <Radio.Group defaultValue={props.current} buttonStyle="outline" onChange={onChange}>
        <Radio.Button value={TimeDisplayMode.Real}>Real</Radio.Button>
        <Radio.Button value={TimeDisplayMode.Sim}>Simulation</Radio.Button>
      </Radio.Group>
    </>
  );
};

export default TimeDisplayModeSelect;
