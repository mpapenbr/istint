import { Input } from "antd";
import React from "react";

interface IDispatchProps {
  setName: (value: string) => any;
}
interface IStateProps {
  name: string;
}
type MyProps = IDispatchProps & IStateProps;
const RaceName: React.FC<MyProps> = (props: MyProps) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.setName(e.target.value);
  };

  return <Input value={props.name} onChange={onChange} />;
};

export default RaceName;
