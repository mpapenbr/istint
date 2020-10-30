import { CopyOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Table } from "antd";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import { MyEvent } from "../../api/events";
import { jsonDateEnhancer } from "../../utils/compressJson";

interface IStateProps {
  events: MyEvent[];
}
interface IDispatchProps {
  loadEvent: (raceData: any) => any;
  deleteEvent: (id: string) => any;
}

type MyProps = IStateProps & IDispatchProps;

const EventList: React.FC<MyProps> = (props: MyProps) => {
  const onClickForEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(e.currentTarget.value);
    const toLoad = props.events.find((v) => v.id === e.currentTarget.value);
    if (toLoad !== undefined) {
      // console.log(toLoad.rawData);
      const dings = jsonDateEnhancer(JSON.stringify(toLoad.rawData));
      dings.id = e.currentTarget.value;
      props.loadEvent(dings);
    }
    // props.driverSelected(e.currentTarget.value);
  };
  const onClickForRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    props.deleteEvent(e.currentTarget.value);
  };
  const onClickForDuplicate = (e: React.MouseEvent<HTMLButtonElement>) => {
    const toLoad = props.events.find((v) => v.id === e.currentTarget.value);
    if (toLoad !== undefined) {
      const dings = jsonDateEnhancer(JSON.stringify(toLoad.rawData));
      dings.id = uuidv4();
      dings.name = "Copy of " + dings.name;
      props.loadEvent(dings);
    }
  };

  const extraButtons = (d: MyEvent) => (
    <div>
      <Button icon={<EditOutlined />} value={d.id} onClick={onClickForEdit} />
      <Button icon={<CopyOutlined />} value={d.id} onClick={onClickForDuplicate} />
      <Button icon={<DeleteOutlined />} value={d.id} onClick={onClickForRemove} />
    </div>
  );

  const cellColumns = [
    {
      title: "Event",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Car",
      key: "carName",
      dataIndex: "carName",
    },
    {
      title: "Track",
      key: "trackName",
      dataIndex: "trackName",
    },
    {
      title: "Modified",
      key: "lastModified",
      dataIndex: "lastModified",
    },
    {
      title: "Action",
      dataIndex: ["no"],
      editable: false,
      render: (no: number, record: MyEvent) => extraButtons(record),
    },
  ];
  return <Table pagination={false} rowKey="id" columns={cellColumns} dataSource={props.events} />;
};
export default EventList;
