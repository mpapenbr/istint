import { Radio } from "antd";
import { RadioChangeEvent } from "antd/lib/radio/interface";
import React from "react";
import { StintEditMode } from "../../stores/settings/types";

interface IDispatchProps {
  selectStintEditMode: (id: number) => any;
}
interface IStateProps {
  current: StintEditMode;
}
type MyProps = IDispatchProps & IStateProps;
const StintEditModeSelect: React.FC<MyProps> = ({ current, selectStintEditMode, ...rest }: MyProps) => {
  const onChange = (e: RadioChangeEvent) => {
    selectStintEditMode(e.target.value);
  };
  return (
    <>
      <Radio.Group {...rest} defaultValue={current} buttonStyle="outline" onChange={onChange}>
        <Radio.Button value={StintEditMode.EditRow}>Edit row</Radio.Button>
        <Radio.Button value={StintEditMode.MoveRows}>Move row</Radio.Button>
      </Radio.Group>
    </>
  );
};

export default StintEditModeSelect;
