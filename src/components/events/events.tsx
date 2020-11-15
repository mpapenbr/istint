import { CopyOutlined, DeleteOutlined, EditOutlined, ShareAltOutlined } from "@ant-design/icons";
import { Button, notification, Table, Tooltip } from "antd";
import { ColumnsType } from "antd/lib/table";
import copy from "copy-to-clipboard";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import { MyEvent } from "../../api/events";

interface IStateProps {
  events: MyEvent[];
}
interface IDispatchProps {
  loadEvent: (eventId: string) => any;
  deleteEvent: (id: string) => any;
  storeAndUpdateEvent: (event: MyEvent) => any;
}

type MyProps = IStateProps & IDispatchProps;

const EventList: React.FC<MyProps> = (props: MyProps) => {
  const onClickForEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(e.currentTarget.value);
    props.loadEvent(e.currentTarget.value);
  };
  const onClickForRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    props.deleteEvent(e.currentTarget.value);
  };
  const onClickForDuplicate = (e: React.MouseEvent<HTMLButtonElement>) => {
    const toLoad = props.events.find((v) => v.id === e.currentTarget.value);
    if (toLoad !== undefined) {
      // const dings = jsonDateEnhancer(JSON.stringify(toLoad.rawData));
      const dings = { ...toLoad };
      dings.id = uuidv4();
      dings.name = "Copy of " + dings.rawData.race.name;
      dings.rawData.race.id = dings.id;
      dings.rawData.race.name = dings.name;
      props.storeAndUpdateEvent(dings);
    }
  };

  const doOpenNotification = (e: React.MouseEvent<HTMLButtonElement>) => {
    const url = window.location.origin + "/ext?id=" + e.currentTarget.value;
    copy(url);
    notification.open({
      message: "Share event",
      description: (
        <div>
          Anyone who has the link can access. Copied to clipboard.
          <br />
          {url}
        </div>
      ),
      onClick: () => {
        console.log("done");
      },
    });
  };

  const extraButtons = (d: MyEvent) => (
    <div>
      <Tooltip title="Load the event">
        <Button icon={<EditOutlined />} value={d.id} onClick={onClickForEdit} />
      </Tooltip>
      <Tooltip title="Create a copy">
        <Button icon={<CopyOutlined />} value={d.id} onClick={onClickForDuplicate} />
      </Tooltip>
      <Tooltip title="Delete the event">
        <Button icon={<DeleteOutlined />} value={d.id} onClick={onClickForRemove} />
      </Tooltip>
      <Tooltip title="Share the event">
        <Button icon={<ShareAltOutlined />} value={d.id} onClick={doOpenNotification} />
      </Tooltip>
    </div>
  );

  const cellColumns: ColumnsType<MyEvent> = [
    {
      title: <Tooltip title="Event description">Event</Tooltip>,
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
      render: (no: number, record: MyEvent) => new Date(record.lastModified!).toLocaleString(),
    },
    {
      title: "Action",
      dataIndex: ["no"],

      render: (no: number, record: MyEvent) => extraButtons(record),
    },
  ];
  return <Table pagination={false} rowKey="id" columns={cellColumns} dataSource={props.events} />;
};
export default EventList;
