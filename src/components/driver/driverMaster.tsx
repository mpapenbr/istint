import { CopyOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, List } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { sprintf } from "sprintf-js";
import { ApplicationState } from "../../stores";
import { IDriver } from "../../stores/driver/types";
// import "./compact-stints.css";

interface IStateProps {
  //  raceData: ITimedRace;
}
interface IDispatchProps {
  driverSelected: (id: number) => void;
  addNewDriver: () => void;
  removeDriver: (id: number) => void;
  duplicateDriver: (id: number) => void;
}
type MyProps = IStateProps & IDispatchProps;

const DriverMaster: React.FC<MyProps> = (props: MyProps) => {
  const driverData = useSelector(({ driver }: ApplicationState) => ({ ...driver }.allDrivers));

  const onClickForEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    props.driverSelected(parseInt(e.currentTarget.value));
  };
  const onClickForRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    props.removeDriver(parseInt(e.currentTarget.value));
  };
  const onClickForDuplicate = (e: React.MouseEvent<HTMLButtonElement>) => {
    props.duplicateDriver(parseInt(e.currentTarget.value));
  };

  const extraButtons = (d: IDriver) => (
    <div>
      <Button icon={<EditOutlined />} value={d.id} onClick={onClickForEdit} />
      <Button icon={<CopyOutlined />} value={d.id} onClick={onClickForDuplicate} />
      <Button icon={<DeleteOutlined />} value={d.id} onClick={onClickForRemove} />
    </div>
  );
  const renderListName = (d: IDriver) => (
    <List.Item className={sprintf("driver-%d", d.id)} extra={extraButtons(d)}>
      {d.name}
    </List.Item>
  );
  const addDriver = (e: React.MouseEvent<HTMLButtonElement>) => {
    props.addNewDriver();
  };
  const addDriverButton = <Button onClick={addDriver}>Add</Button>;
  return (
    <List
      dataSource={driverData}
      size="small"
      bordered
      renderItem={renderListName}
      rowKey="id"
      footer={addDriverButton}
    />
  );
};
export default DriverMaster;
