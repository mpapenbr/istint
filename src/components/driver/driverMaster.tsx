import { DeleteOutlined } from "@ant-design/icons";
import { Button, List } from "antd";
import React from "react";
import { useSelector } from "react-redux";
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
  const removeButton = (d: IDriver) => <Button icon={<DeleteOutlined />} value={d.id} onClick={onClickForRemove} />;
  const renderListName = (d: IDriver) => (
    <List.Item extra={removeButton(d)} style={{ background: d.backgroundColor }}>
      <Button value={d.id} onClick={onClickForEdit}>
        {d.name}
      </Button>
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
