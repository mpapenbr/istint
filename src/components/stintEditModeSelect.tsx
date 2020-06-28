import { Radio } from "antd";
import { RadioChangeEvent } from "antd/lib/radio/interface";
import React from "react";
import { StintEditMode } from "../stores/settings/types";

interface IDispatchProps {
  selectStintEditMode: (id: number) => any;
}
interface IStateProps {
  current: StintEditMode;
}
type MyProps = IDispatchProps & IStateProps;
const StintEditModeSelect: React.FC<MyProps> = (props: MyProps) => {
  const onChange = (e: RadioChangeEvent) => {
    props.selectStintEditMode(e.target.value);
  };
  return (
    <>
      <Radio.Group defaultValue={props.current} buttonStyle="solid" onChange={onChange}>
        <Radio.Button value={StintEditMode.EditRow}>Edit row</Radio.Button>
        <Radio.Button value={StintEditMode.MoveRows}>Move row</Radio.Button>
      </Radio.Group>
    </>
  );
};

export default StintEditModeSelect;
