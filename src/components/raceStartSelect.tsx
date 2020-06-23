import { DatePicker } from "antd";
import moment from "antd/node_modules/moment";
// import moment, { Moment } from "moment";
import React from "react";

interface IDispatchProps {
  setDate: (date: Date) => any;
}
interface IStateProps {
  time: Date;
}
type MyProps = IDispatchProps & IStateProps;
const RaceStartSelect: React.FC<MyProps> = (props: MyProps) => {
  const onChange = (value: moment.Moment | null, x: string) => {
    if (value !== null) {
      props.setDate(new Date(value.toISOString()));
    }
  };
  const onOk = (value: moment.Moment) => {
    // console.log(value.toISOString())
    // console.log(new Date(value.toISOString()))
    props.setDate(new Date(value.toISOString()));
  };
  const format = "DD.MM.YYYY HH:mm";
  return (
    <DatePicker
      value={moment(props.time, moment.ISO_8601)}
      format={format}
      showTime={true}
      onOk={onOk}
      onChange={onChange}
    />
  );
};

export default RaceStartSelect;
